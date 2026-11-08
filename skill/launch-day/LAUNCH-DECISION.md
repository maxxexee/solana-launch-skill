# Launch Decision

The launch venue is a permanent brand signal. Choose based on your community, not what is trending.

## Decision Tree

```
Is your token a meme or community coin with no product yet?
  YES → pump.fun (see below)
  NO  ↓

Do you want a managed sale with price discovery?
  YES → Do you have an existing community of more than 1,000 engaged holders?
          YES → Meteora Dynamic AMM or Raydium Launchpad
          NO  → Meteora Alpha Vault (fair launch, bot protection)
  NO  ↓

Do you want to set your own price and go straight to trading?
  YES → Direct LP seeding on Raydium CLMM or Orca Whirlpool (→ LIQUIDITY-SEED.md)
```

## pump.fun

Best for: meme coins, community coins, tokens where the culture is the product.

**Mechanics:** bonding curve launch where price increases as supply is purchased. Graduates to Raydium when market cap hits roughly $69K. 1% fee on buys and sells.

**Pros:**
- Zero setup friction - token live in minutes
- Built-in discovery engine (thousands of traders watching)
- Proven graduation path to Raydium liquidity

**Cons:**
- No vesting, no lockup, no IDO structure
- High sniper and bot activity in first blocks
- Graduation is not guaranteed
- Serious protocol teams are judged negatively for using it

Do not use pump.fun if you have a product, a roadmap, and investors. If you published a whitepaper. If you want to list on centralized exchanges.

## Meteora Dynamic AMM and Alpha Vault

Best for: serious protocols wanting a fair, bot-resistant launch.

**Alpha Vault mechanics:** pre-sale period where deposits are accepted and sniping is impossible. At launch, deposits convert to LP at a single price (uniform price auction). No advantage to being first in the block.

**Key parameters to set:**

```
depositingPoint           // When deposits open (Unix timestamp)
startVestingPoint         // When LP tokens start vesting
endVestingPoint           // When LP tokens fully vest
maxDepositingCap          // Max SOL raised
individualDepositingCap   // Per-wallet cap
escrowFee                 // Fee charged on early withdrawal
```

**Pros:**
- Fairest price discovery on Solana
- No MEV or sniper advantage
- Integrates with Meteora's DLMM for post-launch liquidity management

**Cons:**
- More setup complexity
- Requires community education ("why can't I buy immediately?")
- Less viral than pump.fun

Meteora docs: https://docs.meteora.ag/alpha-vault/dynamic-amm-with-alpha-vault

SDK: `@meteora-ag/alpha-vault`

## Raydium Launchpad

Best for: projects with established community and VC backing that want Raydium's distribution.

**Mechanics:** application-based - Raydium selects projects. Oversubscription allocation: excess refunded. Directly launches into Raydium CLMM pool.

**Requirements as of 2026:**
- Working product or strong MVP
- Security audit
- Community traction (Discord, Twitter)
- Raydium team approval

**Pros:**
- Raydium brand association is a credibility signal
- Raydium pool means immediate access to Raydium liquidity routing
- Raydium's user base sees your launch natively

**Cons:**
- Competitive application process
- Less control over parameters vs. self-managed Meteora launch

## Direct LP Seeding

Best for: protocols launching without a token sale - community airdrop and instant trading.

**Mechanics:**
1. Airdrop tokens to community
2. Seed initial liquidity on Raydium CLMM or Orca Whirlpool
3. Trading begins immediately at your initial price

**This path requires:**
- Strong existing community (airdrop recipients = initial holders)
- Sufficient LP budget (under-liquidity = volatile launch = bad press)
- Jito bundle for anti-snipe on the LP creation transaction

Full setup instructions: `LIQUIDITY-SEED.md` and `JITO-BUNDLES.md`

## Summary Comparison

| Venue | Price Discovery | Bot Protection | Setup Complexity | Best For |
|---|---|---|---|---|
| pump.fun | Bonding curve | Low | Minimal | Meme/community tokens |
| Meteora Alpha Vault | Fair auction | High | Medium | Fair protocol launches |
| Raydium Launchpad | Fixed + overflow | Medium | Application required | VC-backed, established community |
| Direct LP | You set it | Low (use Jito) | Medium-high | Airdrop + instant trading |
