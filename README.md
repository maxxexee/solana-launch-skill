# solana-launch-skill

The definitive Solana protocol launch playbook for the Solana AI Kit.

Every phase of a token or protocol launch - from pre-launch security gates to post-launch growth loops - in one progressive, token-efficient skill.

## The Problem This Solves

Launch knowledge on Solana is tribal. It lives in Twitter threads, Discord DMs, and the hard-won lessons of founders who shipped before you. There is no consolidated, AI-accessible playbook that covers the full lifecycle: security gates, tokenomics validation, AMM selection, Jito bundle setup, exchange listing prep, and incident response.

This skill fixes that.

## What Is Inside

```text
solana-launch-skill/
├── skill/
│   ├── SKILL.md                          ← Start here. Routes everything.
│   │
│   ├── pre-launch/
│   │   ├── SECURITY-GATE.md              ← Mandatory checklist. Hard stop.
│   │   ├── TOKENOMICS.md                 ← Model, validate, stress-test
│   │   ├── LEGAL-BASICS.md               ← Token classification, jurisdiction flags
│   │   └── COMMUNITY-BOOTSTRAP.md        ← Build community before launch day
│   │
│   ├── launch-day/
│   │   ├── LAUNCH-DECISION.md            ← pump.fun vs Meteora vs Raydium vs Direct LP
│   │   ├── LIQUIDITY-SEED.md             ← LP math, AMM params, price anchoring
│   │   ├── JITO-BUNDLES.md               ← Anti-snipe config, atomic transaction setup
│   │   └── LAUNCH-CHECKLIST.md           ← War-room checklist, T-24h to T+1h
│   │
│   └── post-launch/
│       ├── CEX-PREP.md                   ← Exchange listing requirements and timeline
│       ├── INCIDENT-RESPONSE.md          ← When things go wrong: exploit, rug accusation, depeg
│       └── GROWTH-LOOPS.md               ← Retention, incentive design, sustainable TVL
├── commands/
│   ├── launch-audit.md                   ← /launch-audit: interview → pass/fail report
│   ├── tokenomics-sim.md                 ← /tokenomics-sim: model your distribution
│   ├── launch-sim.md                     ← /launch-sim: simulate launch day dynamics
│   └── grant-writer.md                   ← /grant-writer: generate a grant application
├── agents/
│   └── launch-coordinator.md             ← Multi-role war room agent
└── rules/
    └── launch-principles.md              ← Always-on principles for every response
```

## Repository Assets

| Asset | Description |
|---|---|
| `docs/assets/banner.png` | 2560x800 banner image |
| `docs/assets/social-preview.png` | 1280x640 social preview |
| `docs/assets/screen-landing.png` | 1600x1000 landing screenshot |
| `docs/assets/screen-vault.png` | 1600x1000 vault screenshot |
| `docs/assets/screen-dashboard.png` | 1600x1000 dashboard screenshot |

## Quick Start

**Option 1: Install into Solana AI Kit (Claude Code)**
```bash
bash <(curl -s https://raw.githubusercontent.com/maxxexee/solana-launch-skill/main/install.sh)
```

**Option 2: Claude.ai Project Knowledge**
1. Open Claude.ai and go to your project
2. Add `skill/SKILL.md` as a knowledge file
3. Ask: "I'm preparing to launch a Solana protocol - run /launch-audit"

**Option 3: Cursor or Windsurf**
Copy `skill/SKILL.md` content into `.cursor/rules` or your project rules file.

**Option 4: Any AI System Prompt**
Paste the contents of `skill/SKILL.md` into your system prompt. Load sub-skills as needed.

## The Four Commands

These are the fastest entry points. Each produces structured, actionable output.

| Command | What it does |
|---|---|
| `/launch-audit` | 5 questions → full launch readiness report with pass/fail gates |
| `/tokenomics-sim` | Models your token distribution, vesting schedule, and unlock pressure month-by-month |
| `/launch-sim` | Simulates launch day: price impact at various buy/sell sizes, snipe risk score, LP depth verdict |
| `/grant-writer` | Generates a complete grant application for Solana Foundation, Superteam, or Colosseum |

## Design Principles

**Progressive loading.** The top-level `SKILL.md` is a concise router. Sub-skills load only when needed. Your context window is not a dumping ground.

**Concrete over generic.** Every recommendation is specific and actionable. "Use a multisig" is not a recommendation. "Use Squads with 3-of-5 signers and a 24h timelock on upgrade transactions" is.

**On-chain truth.** Every trust claim must be verifiable on-chain. "The team said they won't sell" appears nowhere in these files.

**Hard stops.** The security gate and launch blockers are not suggestions. They are gates.

**Cross-domain.** This skill intentionally routes to `solana-auditor-skill`, `crypto-legal-skill`, and other kit skills when depth is needed.

## Cross-Skill Integration

| Need | Route to |
|---|---|
| Deep program security analysis | `solana-auditor-skill` |
| Legal compliance depth | `crypto-legal-skill` |
| CLMM position management post-launch | `position-manager-skill` |
| RPC optimization | Helius skill |
| Jupiter swap execution | Jupiter skill |

## Judging Criteria

**Usefulness:** Every founder launching on Solana needs this. It is the most universally applicable problem in the ecosystem.

**Novelty:** No consolidated, AI-accessible launch playbook existed. Launch knowledge was tribal.

**Quality:** Production-grade content covering the 2026 stack - Jito bundles, Meteora Alpha Vault, Squads v4, CLMM, Streamflow. Code samples are real and functional.

**Fit:** Progressive loading, clean SKILL.md routing, cross-skill integration, installer script. Slots directly into the kit.

## License

MIT