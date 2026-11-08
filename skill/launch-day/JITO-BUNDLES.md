# Jito Bundles

Solana's mempool is public. Without Jito, your LP creation is a sniper's opening bell.

## What Jito Bundles Do

A Jito bundle is a group of up to 5 transactions that execute atomically in order within a single block. Either all succeed or all fail - no partial execution.

For launch, this means:
- LP creation plus initial liquidity deposit: atomic (no sniper window between)
- Token transfers plus pool initialization: atomic
- Airdrop claim gate plus protocol activation: atomic

Jito bundles are submitted directly to Jito block engines, bypassing the standard mempool:
- No frontrunning (bundle is private until included)
- Guaranteed ordering within the bundle
- MEV protection

## Bundle Anatomy for LP Launch

```
Bundle (max 5 txs):
  tx[0]: Create pool (Raydium CLMM / Orca)
  tx[1]: Add initial liquidity
  tx[2]: (Optional) Lock LP tokens
  tx[3]: (Optional) Emit launch event / update program state
  tx[4]: (Optional) Treasury / fee wallet setup tx
```

If you need more than 5 transactions, split into two sequential bundles. The first must fully confirm before the second is submitted.

## Setup

```bash
pnpm add @jito-labs/mev-sdk @solana/web3.js
# or
pnpm add jito-ts
```

```typescript
import {
  SearcherClient,
  searcherClient,
} from "jito-ts/dist/sdk/block-engine/searcher";
import { Bundle } from "jito-ts/dist/sdk/block-engine/types";
import { Connection, Keypair, Transaction } from "@solana/web3.js";

const BLOCK_ENGINE_URL = "mainnet.block-engine.jito.wtf";
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=YOUR_KEY");
```

## Jito Tip - How Much to Pay

The Jito tip is paid to the validator who includes your bundle. It is separate from the transaction fee.

| Scenario | Tip amount |
|---|---|
| Normal conditions | 0.001 SOL |
| Competitive launch (high demand) | 0.01 to 0.05 SOL |
| Guaranteed fast inclusion | 0.05 to 0.1 SOL |
| Emergency (exploit response) | 0.1 to 1 SOL |

```typescript
// Query current tip floor from Jito
const tipAccounts = await searcherClient.getTipAccounts();
const tipAccount = tipAccounts[Math.floor(Math.random() * tipAccounts.length)];
```

## Full Bundle Implementation

```typescript
import { searcherClient } from "jito-ts/dist/sdk/block-engine/searcher";
import { Bundle } from "jito-ts/dist/sdk/block-engine/types";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const TIP_LAMPORTS = 0.01 * LAMPORTS_PER_SOL;

async function sendLaunchBundle(
  payer: Keypair,
  transactions: Transaction[],
  connection: Connection
) {
  const client = searcherClient(BLOCK_ENGINE_URL, payer);

  const tipAccounts = await client.getTipAccounts();
  const tipAccount = new PublicKey(
    tipAccounts[Math.floor(Math.random() * tipAccounts.length)]
  );

  const { blockhash } = await connection.getLatestBlockhash("confirmed");

  const tipTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: tipAccount,
      lamports: TIP_LAMPORTS,
    })
  );
  tipTx.recentBlockhash = blockhash;
  tipTx.feePayer = payer.publicKey;
  tipTx.sign(payer);

  for (const tx of transactions) {
    tx.recentBlockhash = blockhash;
    tx.feePayer = payer.publicKey;
  }

  const bundle = new Bundle([...transactions, tipTx], 5);
  const bundleId = await client.sendBundle(bundle);
  console.log(`Bundle submitted: ${bundleId}`);

  return await waitForBundleConfirmation(client, bundleId, 60_000);
}

async function waitForBundleConfirmation(
  client: ReturnType<typeof searcherClient>,
  bundleId: string,
  timeoutMs: number
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const statuses = await client.getBundleStatuses([bundleId]);
    const status = statuses.value[0];
    if (status?.confirmation_status === "finalized") return true;
    if (status?.err) throw new Error(`Bundle failed: ${JSON.stringify(status.err)}`);
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error(`Bundle confirmation timeout after ${timeoutMs}ms`);
}
```

## Versioned Transactions (V0)

Use V0 for address lookup tables or programs that require it.

```typescript
import {
  TransactionMessage,
  VersionedTransaction,
  AddressLookupTableAccount,
} from "@solana/web3.js";

const message = new TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions: [...yourInstructions],
}).compileToV0Message(lookupTableAccounts);

const versionedTx = new VersionedTransaction(message);
versionedTx.sign([payer]);
```

## Simulation Before Sending

Always simulate before sending a bundle. A failed bundle wastes your tip.

```typescript
for (const tx of transactions) {
  const simulation = await connection.simulateTransaction(tx, {
    commitment: "confirmed",
    sigVerify: false,
  });
  if (simulation.value.err) {
    throw new Error(
      `Simulation failed: ${JSON.stringify(simulation.value.err)}\n` +
      `Logs: ${simulation.value.logs?.join('\n')}`
    );
  }
}
```

## Anti-Snipe Checklist

- [ ] LP creation and liquidity deposit in the same bundle (atomic)
- [ ] Jito tip set to competitive level for launch conditions
- [ ] All transactions simulated locally before bundle submission
- [ ] Blockhash freshness verified (less than 30 seconds old) before submit
- [ ] Bundle submission retried with new blockhash if slot missed
- [ ] Monitoring: watch bundle status endpoint, alert on failure
- [ ] Fallback plan: if Jito is down, use priority fees with skipPreflight set to false

## Jito Endpoints

| Network | Block Engine URL |
|---|---|
| Mainnet | `mainnet.block-engine.jito.wtf` |
| Testnet | `testnet.block-engine.jito.wtf` |

Regional endpoints for lower latency:
- `amsterdam.mainnet.block-engine.jito.wtf`
- `frankfurt.mainnet.block-engine.jito.wtf`
- `ny.mainnet.block-engine.jito.wtf`
- `tokyo.mainnet.block-engine.jito.wtf`

For launch: submit to all regional endpoints simultaneously for maximum inclusion probability.
