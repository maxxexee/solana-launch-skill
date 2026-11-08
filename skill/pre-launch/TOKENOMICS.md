# Tokenomics

Good tokenomics is a system. Bad tokenomics is a promise. Design for equilibrium, not hype.

Run `/tokenomics-sim` for structured modeling with pass/fail output.

## Hard Rules Before You Start

1. Team plus investors at or below 20% of total supply. Above this, every unlock is a headline.
2. Community and ecosystem at or above 40%. Below this, "decentralization" is marketing.
3. No cliff shorter than 6 months for team or investors. Day-one unlocks are a rug tell.
4. Liquid at launch at or below 15% of total supply. More means price discovery is impossible.

## Distribution Buckets

| Bucket | Recommended Range | Your Allocation | Vesting |
|---|---|---|---|
| Community / Ecosystem | 40 to 55% | | Airdrop / emissions |
| Treasury / DAO | 15 to 25% | | Timelock or multisig |
| Team | 10 to 15% | | 12-month cliff, 24-month linear |
| Investors / Seed | 5 to 10% | | 6-month cliff, 18-month linear |
| Liquidity / Exchange | 5 to 10% | | Locked in LP, not team-controlled |
| Public Sale / IDO | 3 to 8% | | Unlocked at TGE |
| Airdrop | 5 to 10% | | Vesting or immediate |

## Unlock Pressure Analysis

The most important chart nobody draws until it is too late.

Monthly unlock pressure = (tokens unlocking that month) / (expected daily volume × 30)

If unlock pressure is above 0.3, expect significant sell pressure.

**Vesting schedule red flags:**
- Any team or investor tokens unlock in month 1 to 3 → expect dump
- Large cliff unlocks with no secondary lockup → cliff becomes a sell event
- Unlocks not publicly visible on-chain → community will assume the worst

**Tools to model and publish vesting:**
- Token Unlocks (tokenunlocks.app) - publish your schedule here before launch
- Vesting programs: use SPL governance timelock or Streamflow/Valhalla for on-chain vesting
- Never use "team says they won't sell" as a vesting mechanism

```typescript
import { StreamflowSolana } from "@streamflow/stream";
// Or Valhalla for DAO-owned vesting
// https://github.com/valhalla-finance/valhalla
```

## Inflation and Emission Design

**Fixed supply**
Simple. Clear. No ongoing inflation risk.
Downside: requires another mechanism for protocol revenue sharing (fee switch, buyback).

**Inflationary supply**
Enables staking rewards, LP incentives, ongoing contributor pay.
Must answer: what is the terminal inflation rate? (Solana uses roughly 5% tapering to 1.5%)
Must answer: what offsets inflation? (burn mechanism, buyback, fee sink)

**Emission schedule checklist:**
- [ ] Emission rate published and immutable or governance-controlled with timelock
- [ ] Emissions go to stakers, LPs, contributors - not team wallets
- [ ] Emission cliff at end of incentive period modeled and communicated

## Token Utility - The Real Test

Ask: if the token price went to zero, would anyone still need it?

**Strong utility signals:**
- Required to pay protocol fees (not "you can optionally pay in our token")
- Governance with actual on-chain effect (not cosmetic voting)
- Staking that unlocks real yield from protocol revenue
- Access to protocol features (tiered access)

**Weak utility signals:**
- "Governance" with no executable proposals
- Staking with emissions as the only yield source (circular)
- Discount token with no enforcement

## Stress Test Scenarios

Model these before launch:

| Scenario | What to check |
|---|---|
| Whale dumps 5% of supply on day 1 | Does liquidity hold? Price impact? |
| Staking APY drops 80% | Do stakers unstake? What is the exit volume? |
| Team cliff hits at month 12 | Combined unlock pressure vs. projected volume |
| Competitor launches with 2x APY | TVL outflow model |
| Protocol revenue drops to zero | Treasury runway in months |

## Common Tokenomics Mistakes

| Mistake | Outcome |
|---|---|
| Team holds 30%+ | "Dev wallet" narrative. Permanent FUD. |
| No lockup on IDO participants | Dump at TGE. You funded someone's exit. |
| Emissions without a sink | Hyperinflation. Token trends to zero. |
| Liquidity controlled by team multisig | Rug vector regardless of intent. |
| Token required for nothing real | Fails as soon as hype fades. |
