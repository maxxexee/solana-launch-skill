# Legal Basics

This is orientation, not legal advice. Use it to know what questions to ask a crypto lawyer - not to replace one.
For deep compliance work → load `crypto-legal-skill/SKILL.md`

## The First Question: What Is Your Token?

Everything downstream depends on this. Answer honestly.

**Utility Token**
Grants access to a protocol function. Value tied to usage demand, not issuer profit. Safer jurisdiction profile, but not automatically safe.
Test: would the token have value if the team disappeared tomorrow?

**Governance Token**
Grants voting rights over a protocol. Often treated as utility if the protocol is genuinely decentralized.
Risk: if governance controls a treasury that distributes revenue, it looks like a security.

**Security Token**
Represents investment with expectation of profit from others' efforts (Howey Test). Requires registration or exemption in the US. Most tokens that promise "revenue sharing," "yield," or "buybacks" live here.
Do not launch a security token without a securities lawyer.

**The Howey Test (US)**
A token is likely a security if all four are true:
1. Investment of money
2. In a common enterprise
3. With expectation of profits
4. From the efforts of others

If your token pitch says "earn," "yield," "revenue share," or "appreciate in value" - you are three-quarters of the way to a security and need legal counsel.

## Jurisdiction Quick Reference

| Jurisdiction | General stance | Key flag |
|---|---|---|
| USA | Hostile → improving | SEC claims most tokens are securities. KYC/AML required for exchanges. Geofence US users from IDO if unregistered. |
| UK | Moderate | FCA registration required for UK-facing exchanges. "Financial promotion" rules apply to marketing. |
| Singapore | Crypto-friendly | MAS Payment Services Act. DPT license needed if facilitating exchange. Good for foundations. |
| Switzerland | Crypto-friendly | FINMA guidance is clear. Zug ("Crypto Valley") has established foundation structures. |
| UAE | Crypto-friendly | VARA (Dubai) and ADGM (Abu Dhabi) both have regulated crypto frameworks. |
| Germany | Moderate | BaFin oversight. Crypto custody license required for some activities. |
| China | Hostile | Crypto transactions banned. Do not launch for Chinese users. |

## Foundation vs. Company Structure

Most Solana protocols use a foundation to separate IP and protocol ownership from team equity. The foundation can hold treasury without profit motive and carries a cleaner regulatory profile in Switzerland, Cayman, and BVI.

| Structure | Where | Used for |
|---|---|---|
| Swiss Association (Verein) | Switzerland | Small/community protocols |
| Swiss Foundation (Stiftung) | Switzerland | Mid-large protocols, Solana Foundation model |
| Cayman Foundation | Cayman Islands | Many DeFi protocols |
| BVI Company | British Virgin Islands | Holding structure, IP |
| Delaware C-Corp | USA | VC-backed team entity (separate from protocol) |

The common pattern: Delaware C-Corp for the team plus Cayman Foundation for the protocol and treasury.

## What to Geofence at Launch

At minimum, geofence these jurisdictions at your IDO or public sale frontend:
- United States (unless you have securities counsel sign-off)
- China
- North Korea
- Any OFAC-sanctioned country

```typescript
const BLOCKED_COUNTRIES = ['US', 'CN', 'KP', 'IR', 'SY', 'CU'];

async function checkGeoBlock(ip: string): Promise<boolean> {
  const res = await fetch(`https://ipapi.co/${ip}/country/`);
  const country = await res.text();
  return BLOCKED_COUNTRIES.includes(country.trim());
}
```

Geofencing is not a legal shield - it is due diligence. A determined US person can use a VPN. Document that you made reasonable efforts.

## KYC/AML - When You Need It

**You need KYC/AML if:**
- Running an IDO with USD/EUR fiat on-ramp
- Operating as an exchange or swap aggregator
- Raising from US investors
- Incorporating in a jurisdiction that requires it (UK, EU MiCA)

**You typically do not need it for:**
- Permissionless protocol deployment
- Community airdrop (no sale)
- DAO governance distribution

Provider options: Sumsub, Persona, Jumio, Synaps (crypto-native)

## Pre-Launch Legal Checklist

- [ ] Token classification opinion from a crypto lawyer (not optional if raising above $500K)
- [ ] Jurisdiction chosen for foundation/company
- [ ] Terms of Service drafted for dApp frontend
- [ ] Privacy Policy drafted (required in EU/UK)
- [ ] Geofence implemented for restricted jurisdictions
- [ ] Token Sale Agreement or SAFT reviewed if raising from investors
- [ ] IP assigned from individuals to entity
- [ ] Team contractor/employment agreements with IP assignment clauses

## Language to Never Use in Public

Never say in any public channel - Discord, Twitter, docs:
- "Token price will increase" or "guaranteed returns"
- "We will buy back tokens to support price"
- "Early investors will profit"
- "[X]% APY guaranteed"

All of these are securities marketing language and create legal liability even if your token is otherwise structured correctly.
