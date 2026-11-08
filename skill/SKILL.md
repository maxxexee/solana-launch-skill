# solana-launch-skill

One skill. Every phase of a Solana token or protocol launch - from first line of code to post-launch market structure.

## What this skill covers

Three phases. Load only what you need.

| Phase | When to load |
|---|---|
| Pre-Launch | Designing tokenomics, security audit gate, legal basics, community setup |
| Launch Day | AMM selection, liquidity seeding, Jito bundles, the war-room checklist |
| Post-Launch | CEX prep, incident response, growth loops |

## Commands (load these first for structured output)

`/launch-audit` → `../commands/launch-audit.md` - 5 questions → full launch readiness report with pass/fail gates

`/tokenomics-sim` → `../commands/tokenomics-sim.md` - model your token distribution, vesting, and unlock pressure

`/launch-sim` → `../commands/launch-sim.md` - simulate launch day: price impact, LP depth, snipe risk score

`/grant-writer` → `../commands/grant-writer.md` - generate a Solana Foundation or Superteam grant application

## Pre-Launch

Load in order. Each is a hard gate.

1. `pre-launch/SECURITY-GATE.md` - mandatory security checklist. No exceptions.
2. `pre-launch/TOKENOMICS.md` - model, validate, stress-test your distribution
3. `pre-launch/LEGAL-BASICS.md` - token classification flags, jurisdiction basics
4. `pre-launch/COMMUNITY-BOOTSTRAP.md` - launch community before launch day

## Launch Day

5. `launch-day/LAUNCH-DECISION.md` - pump.fun vs. Raydium IDO vs. Meteora: structured decision tree
6. `launch-day/LIQUIDITY-SEED.md` - initial LP math, AMM params, price anchoring
7. `launch-day/JITO-BUNDLES.md` - anti-snipe config, atomic transaction setup
8. `launch-day/LAUNCH-CHECKLIST.md` - the war-room checklist, T-minus to T+1h

## Post-Launch

9. `post-launch/CEX-PREP.md` - exchange listing requirements, timeline, what not to do
10. `post-launch/INCIDENT-RESPONSE.md` - when things go wrong: exploit, rug accusation, depeg
11. `post-launch/GROWTH-LOOPS.md` - retention, incentive design, sustainable TVL

## Multi-agent mode

For full launch coordination across all domains simultaneously:
→ `../agents/launch-coordinator.md`

## Cross-skill integrations

This skill routes out to the wider Solana AI Kit:

- Security deep-dives → `solana-auditor-skill`
- Legal compliance detail → `crypto-legal-skill`
- RPC / on-chain execution → Helius skill
- Jupiter swap execution → Jupiter skill

Load the sub-skill when you need depth. This skill stays shallow and routes fast.
