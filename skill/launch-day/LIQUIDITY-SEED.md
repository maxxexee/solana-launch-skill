# Liquidity Seed

Your initial liquidity setup is permanent in the market's memory. Get the math right before you touch mainnet.

## The Fundamental Liquidity Question

**How much SOL/USDC do you need to seed?**

Target: price impact of a 1% circulating supply market sell at or below 10%.

```
Required LP depth ≈ circulating_supply × initial_price

Simpler rule: LP value at or above 100% of circulating market cap at launch
```

**Example:**
- 100M tokens circulating at launch
- Initial price target: $0.01
- Circulating market cap: $1M
- Minimum LP: $1M (50% SOL + 50% token value)
- Comfortable LP: $2M to $3M

Under-liquidity is the most common launch mistake. It makes price volatile, invites snipers, and signals that the team did not plan.

## AMM Selection for LP Seeding

### Raydium CLMM (Concentrated Liquidity)

Use when: you want capital-efficient LP, expect high volume, team can actively manage range.

```typescript
import { Raydium, CLMM } from '@raydium-io/raydium-sdk-v2';

const poolConfig = {
  mint1: tokenMint,
  mint2: NATIVE_MINT,
  initialPrice: 0.01,
  tickSpacing: 60,
  startTime: launchTimestamp
};
```

**Tick spacing guide:**

| Pair type | Tick spacing | Fee tier |
|---|---|---|
| Stable pairs | 1 | 0.01% |
| Correlated assets | 10 | 0.05% |
| Standard | 60 | 0.25% |
| Exotic / new token | 200 | 1% |

For a new token launch: tick spacing 60 (0.25% fee). Capital efficient without requiring active management every hour.

### Orca Whirlpool

Use when: you prefer Orca's ecosystem or integrating with Orca tooling. Same concentrated liquidity model as Raydium CLMM. Parameters are equivalent.

```typescript
import { WhirlpoolContext, buildWhirlpoolClient } from "@orca-so/whirlpools-sdk";
// Initial sqrt price from price: Math.sqrt(initialPrice) * 2^64
```

### Raydium Standard AMM

Use when: maximum simplicity, no active management, broad wallet support matters more than capital efficiency. Constant product x*y=k. Infinite range. Less capital efficient but zero management.

## Price Anchoring Strategy

**Setting the initial price**

```
FDV = initial_price × total_supply
Initial Circulating Market Cap = initial_price × circulating_supply
```

**Calibration examples:**
- 1B total supply, $10M FDV target → $0.01/token
- 100M total supply, $10M FDV target → $0.10/token

Rules:
1. FDV at launch should be defensible vs. comparable protocols at the same stage
2. Initial price × LP liquidity must achieve adequate depth
3. Avoid sub-$0.001 prices - psychological barrier, hard for retail to calculate

**Range selection for CLMM at launch**

For a new token with high volatility expected:
- Lower bound: 50% of initial price (allows 2x drop before out-of-range)
- Upper bound: 5x to 10x initial price (allows significant upside while earning fees)

```
Initial price: $0.01
Lower bound:   $0.005  (50% down)
Upper bound:   $0.10   (10x up)
```

## LP Token Strategy

**Critical decision: who controls the initial LP tokens?**

| Option | Trust signal | Risk |
|---|---|---|
| Burn LP tokens | Maximum trust - liquidity is permanent | Cannot recover LP if needed |
| Lock LP tokens (Streamflow/Magna) | High trust - verifiable on-chain timelock | LP released at end of lock |
| Team multisig holds LP | Lower trust - requires community trust | Team can remove liquidity |
| DAO controls LP | Aligned - governance owns liquidity | Governance lag in emergencies |

Lock LP tokens for a minimum of 12 months using an on-chain timelock. Publish the lock transaction hash at launch. This single action eliminates 90% of rug accusations.

```typescript
import { StreamflowSolana } from "@streamflow/stream";
const client = new StreamflowSolana.SolanaStreamClient("https://api.mainnet-beta.solana.com");

await client.create({
  recipient: MULTISIG_ADDRESS,
  tokenId: lpTokenMint.toString(),
  start: Math.floor(Date.now() / 1000),
  amount: new BN(lpTokenAmount),
  period: 1,
  cliff: 12 * 30 * 24 * 3600,    // 12 months cliff
  cliffAmount: new BN(lpTokenAmount),
  amountPerPeriod: new BN(0),
  name: "Protocol Initial LP Lock",
  canTopup: false,
  cancelableBySender: false,      // non-cancellable
  cancelableByRecipient: false,
});
```

## LP Seeding Transaction - Execution Order

This is the atomic sequence. Do not deviate.

1. Deploy/verify program on mainnet (if not already live)
2. Mint tokens to distribution wallets (multisig, treasury, LP wallet)
3. Create pool (generates pool address - needed for Jito bundle)
4. Build LP creation and initial deposit transaction
5. Bundle with Jito (→ see `JITO-BUNDLES.md`) for atomic execution
6. Submit bundle
7. Immediately after confirmation: publish pool address and LP lock transaction hash

Never create the pool in one transaction and add liquidity in a separate unprotected transaction. The gap between those two transactions is a sniper window.

## Post-Seed Liquidity Health Metrics

Monitor these in the first 24 hours:

| Metric | Healthy | Warning |
|---|---|---|
| 24h volume / LP value | 0.5x to 3x | Below 0.1x (no traction) or above 10x (thin LP) |
| Price impact (1% supply sell) | Below 10% | Above 20% |
| LP range utilization | Above 60% | Below 20% (range too wide) or 100% (out of range) |
| Unique traders | Growing | Flat or declining after 48h |
