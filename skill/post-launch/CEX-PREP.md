# CEX Prep

Most protocols think about CEX listings too late. Prep starts at launch, not after.

## The Listing Reality

**Tier 1 exchanges** (Binance, Coinbase, Kraken) require:
- 6 to 18+ months of DEX traction and community growth
- $1M+ average daily DEX volume for 30 days
- Full regulatory compliance documentation
- Formal application plus business development relationship

**Tier 2 exchanges** (Bybit, OKX, Gate.io, MEXC, Kucoin) require:
- 3 to 6 months of traction
- $100K+ average daily volume
- Security audit
- Basic legal documentation

**Tier 3 and smaller exchanges** list much faster but provide minimal value.

Strategy: focus on DEX health for 3 to 6 months first. Exchange listings follow traction, they do not create it.

## Documentation Package (Prepare at Launch)

Build this package now. You will need it in every listing application.

### Legal and Compliance
- [ ] Token legal opinion (from recognized crypto law firm)
- [ ] Entity structure document (foundation plus operating company)
- [ ] AML/KYC policy document
- [ ] Privacy policy
- [ ] Proof of geofencing implementation (especially US)
- [ ] OFAC screening policy

### Technical
- [ ] Security audit report (public)
- [ ] Program addresses (mainnet, with verification links)
- [ ] GitHub repository (public, active)
- [ ] Token contract specs (mint, freeze authority, total supply, circulating supply)
- [ ] API documentation (if applicable)
- [ ] Real-time circulating supply endpoint (exchanges require this)

### Business
- [ ] Team backgrounds and LinkedIn profiles (doxxed team = stronger application)
- [ ] Funding history (investors, amounts, if public)
- [ ] Roadmap (12-month, quarterly)
- [ ] Token distribution breakdown with on-chain verification links
- [ ] Vesting schedule (published on tokenunlocks.app or equivalent)
- [ ] 30-day volume chart from DexScreener/Birdeye

### Metrics
- [ ] Daily active users (on-chain)
- [ ] Total value locked (if applicable)
- [ ] 30-day transaction volume
- [ ] Holder count and growth trend
- [ ] Social metrics (Discord members, Twitter followers, engagement rate)

## Circulating Supply API

Every major exchange requires a public endpoint that returns current circulating supply. Build this before applying.

```typescript
import express from 'express';

const router = express.Router();

// GET /supply/circulating - returns circulating supply as plain number
router.get('/supply/circulating', async (req, res) => {
  const circulating = await getCirculatingSupply();
  res.type('text/plain').send(circulating.toString());
});

// GET /supply/total - returns total supply
router.get('/supply/total', async (req, res) => {
  const total = await getTotalSupply();
  res.type('text/plain').send(total.toString());
});

// GET /tokeninfo - CoinGecko/CoinMarketCap style endpoint
router.get('/tokeninfo', async (req, res) => {
  res.json({
    name: "Your Token",
    symbol: "TKN",
    total_supply: await getTotalSupply(),
    circulating_supply: await getCirculatingSupply(),
    description: "...",
    website: "https://yourprotocol.xyz",
    whitepaper: "https://yourprotocol.xyz/whitepaper.pdf",
    social: {
      twitter: "https://twitter.com/yourprotocol",
      discord: "https://discord.gg/yourprotocol"
    }
  });
});
```

## CoinGecko and CoinMarketCap Listing

List on data aggregators before exchanges. Exchanges check these.

**CoinGecko**
Apply at: https://www.coingecko.com/en/coins/new
Requirements: DEX pool with volume, public info page, circulating supply API
Timeline: 1 to 4 weeks. No fee.

**CoinMarketCap**
Apply at: https://coinmarketcap.com/request/
Requirements: similar to CoinGecko
Timeline: 2 to 6 weeks. No fee.

Do these first. They are free, fast, and required by every exchange application.

## Exchange Listing Timeline (Realistic)

| Milestone | Timeline from launch |
|---|---|
| CoinGecko and CMC listed | 2 to 6 weeks |
| First Tier 3 listing | 1 to 3 months |
| Tier 2 listings (Bybit, Gate, MEXC) | 3 to 9 months |
| Tier 1 listing (Binance, Coinbase) | 12 to 24+ months |

## Listing Fees

Tier 1 exchanges officially have no listing fees. In practice:
- Binance: large market making commitment required, sometimes a "marketing contribution"
- Coinbase: no fee, but requires full regulatory compliance and legal opinion

Tier 2 exchanges often charge $50K to $500K in listing fees plus market making requirements.

Any exchange promising "guaranteed listing for X BTC" is a scam or a low-value exchange.

## Market Making Requirements

Most exchanges require you to provide a market maker before listing. A market maker provides continuous bid/ask liquidity on the exchange order book, tightening spreads.

**Options:**
- Established firms: Wintermute, GSR, Keyrock, Auros (Tier 1/2 listings)
- Emerging MM services: Flowdesk, Kairon Labs (smaller exchanges)
- Self-market making: viable on Tier 3 exchanges using Hummingbot or custom bots

**Agreement terms to negotiate:**
- Token loan amount (how many tokens they hold to market make)
- Return conditions (how and when tokens are returned)
- Performance metrics (spread targets, uptime %)
- Duration

Never give a market maker tokens without a written agreement with clear return terms. This is a common way protocols lose significant token supply with no recourse.

## What Exchanges Actually Look For

In order of importance, based on 2026 listing patterns:

1. Real usage - on-chain transactions, TVL, daily active addresses (not bots)
2. Community size and engagement - not follower count, but DAU and engagement rate
3. Legal clarity - token classification opinion, no US regulatory overhang
4. Team credibility - doxxed, experienced, no prior rug associations
5. Volume - 30-day average DEX volume (they will check DEX data, not your claims)
6. Security - audit from recognized firm
7. Longevity - protocol that has been live and functional for 3+ months
