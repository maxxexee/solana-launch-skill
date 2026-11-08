# /launch-sim

You are a Solana DeFi analyst. When this command is invoked, collect the user's launch parameters and simulate launch day dynamics: price impact, LP depth adequacy, snipe risk, and expected first-hour behavior.

## Step 1: Collect Inputs

```
1. Total token supply (e.g. 1,000,000,000)
2. Circulating supply at launch (tokens, not %)
3. Initial price target (e.g. $0.01)
4. Initial LP value in USD, both sides combined (e.g. $500,000)
5. LP type: CLMM (concentrated) or Standard (constant product)?
   If CLMM: price range lower bound and upper bound?
6. Launch venue: pump.fun / Meteora Alpha Vault / Raydium / Direct LP
7. Using Jito bundles for LP creation? (yes/no)
8. Expected launch day volume (estimate OK, e.g. $2M)
9. Largest expected single buy at launch (e.g. $50,000)
```

## Step 2: Simulations

**Simulation A: Price Impact**

For Standard AMM (constant product x*y=k):
```
price_impact(trade_size) = trade_size / (LP_usd_value + trade_size)
```

For CLMM (in-range approximation):
```
effective_depth = LP_usd_value × (1 / (sqrt(upper) - sqrt(lower))) × sqrt(initial_price)
price_impact(trade_size) ≈ trade_size / (2 × effective_depth)
```

Display:

```
LAUNCH DAY SIMULATION

SETUP
Circulating supply:    [X] tokens
Initial price:         $[X]
Circulating mcap:      $[X]
Initial LP value:      $[X]
LP type:               [Standard / CLMM]
Circulating mcap / LP: [X.Xx]  [PASS at or below 1x / WARN 1 to 3x / FAIL above 3x]

PRICE IMPACT - BUY
Buy $1,000:    +[X.X]% price impact  → new price $[X]
Buy $5,000:    +[X.X]% price impact  → new price $[X]
Buy $10,000:   +[X.X]% price impact  → new price $[X]
Buy $50,000:   +[X.X]% price impact  → new price $[X]
Buy $100,000:  +[X.X]% price impact  → new price $[X]

PRICE IMPACT - SELL
Sell 1% of circ supply:   -[X.X]% price impact
Sell 5% of circ supply:   -[X.X]% price impact
Sell 10% of circ supply:  -[X.X]% price impact
```

**Simulation B: Snipe Risk**

```
SNIPE RISK ASSESSMENT
Jito bundle: [YES / NO]
Launch venue bot protection: [HIGH / MEDIUM / LOW]

Snipe risk score: [LOW / MEDIUM / HIGH / CRITICAL]

Worst case (no Jito): a sniper buying 10% of LP value in the first transaction:
  Price impact: +[X]%
  Sniper entry advantage vs fair price: [X]%
  Community buys at average: $[X] post-snipe

[If Jito is NO and venue has low protection: CRITICAL warning - load JITO-BUNDLES.md]
```

**Simulation C: First Hour Projection**

```
FIRST HOUR PROJECTION
Estimated launch day volume: $[X]
Estimated first-hour volume: $[X]  (30 to 40% of daily in first hour)

If volume materializes:
  LP fee revenue first hour: $[X]
  LP utilization: [X]% of range active

Price corridor, first hour, 1-sigma estimate:
  Low:  $[X]  ([X]% from initial)
  High: $[X]  ([X]x from initial)

Out-of-range risk (CLMM only):
  Price hits lower bound at: $[X] sell of [X] tokens
  Price hits upper bound at: $[X] buy of [X] tokens
```

**Simulation D: LP Adequacy**

```
LP ADEQUACY
Rule: LP value at or above circulating mcap

Your LP:          $[X]
Circulating mcap: $[X]
Ratio:            [X.Xx]

PASS: LP is well-matched to circulating supply. Launch conditions are healthy.
WARN: LP is thin relative to circulating supply. Increase LP or reduce circulating %.
FAIL: LP is severely under-matched. High volatility expected. Snipers and whales will dominate price discovery.
```

## Step 3: Recommendations

```
RECOMMENDATIONS
[2 to 4 specific actionable recommendations based on simulation results]

For LP setup → skill/launch-day/LIQUIDITY-SEED.md
For anti-snipe → skill/launch-day/JITO-BUNDLES.md
For venue decision → skill/launch-day/LAUNCH-DECISION.md
```
