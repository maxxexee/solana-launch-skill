# Launch Checklist

Work through this in order. Do not multitask. Every step has one owner.

## War Room Setup (T-24h)

Assign these roles before launch day. No ambiguity.

| Role | Responsibility |
|---|---|
| Launch Lead | Owns the checklist. Final call on delays and go/no-go. |
| On-Chain Operator | Executes all transactions. One person, one machine. |
| Monitoring | Watching explorer, Dune/Flipside, Discord in real time. |
| Community Lead | Discord/Telegram. Communicates status. Does not execute transactions. |
| Escalation Contact | Auditor or technical advisor on call. Not expected to be needed. |

Required tools open and authenticated:
- [ ] Solana Explorer or SolScan
- [ ] Your Dune/Flipside dashboard (built pre-launch)
- [ ] Discord admin panel
- [ ] RPC endpoint health dashboard (Helius/QuickNode status page)
- [ ] Jito block engine status
- [ ] Squads multisig interface (if any transactions require multisig approval)

## T-24h Checklist

- [ ] Final program audit verification: deployed binary hash matches audit report
- [ ] All team members confirm their keys are accessible and hardware wallets charged
- [ ] LP seeding wallet funded with exact SOL amount (no last-minute transfers)
- [ ] Token distribution to treasury/team/airdrop wallets confirmed on devnet mirror
- [ ] Jito bundle transactions built, serialized, and tested on devnet
- [ ] RPC endpoint load-tested (simulate 10x expected launch traffic)
- [ ] Monitoring alerts configured (price drop above 30%, LP out of range, large sell)
- [ ] Discord announcement drafted and staged (not sent)
- [ ] Twitter announcement drafted and staged
- [ ] War room participants confirmed on a call bridge

## T-2h Checklist

- [ ] All team in war room
- [ ] Final blockhash freshness check (get latest, confirm RPC is live)
- [ ] Gas wallets topped up - operator wallet has more than 2 SOL for fees
- [ ] Community Lead has announcement ready to paste instantly
- [ ] Monitoring dashboard open and live
- [ ] Escalation contact pinged and confirmed available
- [ ] No new code changes in last 48h (if yes: stop, discuss, go/no-go decision)

## T-0: Launch Sequence

One person executes. Others watch. No parallel execution.

### Step 1 - Pool Creation (via Jito bundle)

```
[ ] Simulate bundle - all transactions pass
[ ] Submit bundle to Jito (all regional endpoints)
[ ] Confirm bundle finalized on-chain
[ ] Verify: pool address is correct
[ ] Verify: initial LP amount matches plan
[ ] Verify: price is at expected initial value
```

### Step 2 - LP Lock

```
[ ] Submit LP token lock transaction (Streamflow/Magna)
[ ] Confirm lock transaction finalized
[ ] Publish lock transaction hash in Discord announcements
```

### Step 3 - Distribution (if airdrop)

```
[ ] Execute airdrop (use batch transfer program for more than 100 addresses)
[ ] Confirm airdrop transactions finalized
[ ] Spot-check 5 random recipient wallets on explorer
```

### Step 4 - Protocol Activation

```
[ ] Enable any protocol features that were gated pre-launch
[ ] Confirm program state reflects live status
[ ] Test one end-to-end protocol interaction from a fresh wallet
```

### Step 5 - Go Public

```
[ ] Community Lead sends Discord announcement (NOT before Step 4 confirmed)
[ ] Twitter announcement sent
[ ] Pin pool address and LP lock hash in Discord announcements
[ ] Update website with live status and pool link
```

## T+30min Monitoring

Every 5 minutes for the first 30 minutes, check:
- [ ] Pool liquidity still healthy (not drained)
- [ ] Price within expected range (no exploit or anomaly)
- [ ] LP range still active (not out of range)
- [ ] No large coordinated sells (more than 5% of supply in single transaction)
- [ ] Discord: no coordinated FUD suggesting technical issues
- [ ] No unexpected program state changes

If any anomaly: pause community communications, investigate before commenting. Silence for 10 minutes is better than wrong information.

## T+1h Review

- [ ] Document what happened (for post-mortem / future launches)
- [ ] Confirm 24h volume trend
- [ ] Post a community update (factual: here is what happened, here is the current state)
- [ ] Thank your war room team

## Go / No-Go Gate

At any point before Step 5, the Launch Lead can call a hold.

| Condition | Action |
|---|---|
| Jito bundle fails 3 times | Hold. Diagnose. RPC or program issue. |
| Simulation shows unexpected token flow | Hold. Audit. |
| Team member unavailable | Hold. Do not launch understaffed. |
| Unusual on-chain activity near program address | Hold. Security check. |
| Discord shows coordinated drain attempt | Hold. Security check. |

There is no shame in a 24h delay. There is permanent shame in a botched launch.

## Emergency Contacts

Pre-fill these before launch day:

| Contact | Purpose |
|---|---|
| Auditor (firm name and contact) | Security incident |
| RPC provider support | RPC outage |
| Jito Discord | Bundle issues |
| Legal counsel | Regulatory emergency |
| Market maker (if engaged) | Liquidity emergency |
