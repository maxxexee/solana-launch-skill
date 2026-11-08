# Security Gate

This is gate zero. A launch without passing this checklist is a liability, not a milestone.
Run `/launch-audit` to get a structured pass/fail report automatically.

## The Non-Negotiables

All must pass before launch.

### 1. Program Verification

- [ ] Program deployed to mainnet is bit-for-bit identical to audited source
- [ ] Verified on-chain via `solana program show <PROGRAM_ID>` - check executable data hash
- [ ] Source code published and pinned on GitHub with matching commit hash
- [ ] No unaudited last-minute changes post-audit, even small ones

```bash
solana program dump <PROGRAM_ID> deployed.so
sha256sum deployed.so
# Must match the sha256 in your audit report
```

### 2. Upgrade Authority

- [ ] Upgrade authority decision documented and intentional:
  - Immutable (burned): no patches possible, highest trust, highest risk if bug found
  - Multisig (recommended): use Squads Protocol, minimum 3-of-5
  - Single key: only acceptable for testnet, never mainnet

If you are launching with a single EOA as upgrade authority, you will be exploited or accused of being a rug. This is not a preference - it is a historical fact.

### 3. Authority and Admin Key Audit

- [ ] Every privileged instruction is documented (pause, fee change, pool drain, mint, freeze)
- [ ] Each admin key is in a multisig with documented key holders
- [ ] Emergency pause mechanism exists and has been tested on devnet
- [ ] Token mint authority: frozen if supply is fixed, multisig if supply can expand

### 4. External Audit

- [ ] Audit completed by a recognized firm (OtterSec, Neodyme, Offside Labs, Trail of Bits, Zellic)
- [ ] Audit report is public or will be published at launch
- [ ] All Critical and High findings: resolved
- [ ] All Medium findings: resolved or formally accepted with written rationale
- [ ] Audit was on the same commit that is deployed

No audit is an automatic fail. "We'll audit post-launch" is how $50M protocols get drained on day 3.

### 5. Economic Attack Surface

- [ ] Price oracle: not using a single on-chain AMM spot price (use TWAP or Pyth/Switchboard)
- [ ] Flash loan attack scenarios documented and mitigated
- [ ] Reentrancy: all CPIs to unknown programs checked
- [ ] Integer overflow: all math uses checked arithmetic (`checked_add`, `checked_mul`)
- [ ] Signer checks: every privileged instruction validates the correct signer

### 6. Token Contract Checks

- [ ] SPL token standard - no custom token program unless audited separately
- [ ] Freeze authority: intentional. If frozen: document why. If burned: confirm irreversible.
- [ ] Metadata: immutable flag set if supply/metadata should not change
- [ ] No hidden mint function accessible by deployer after launch

### 7. Frontend and RPC

- [ ] dApp does not expose private keys or mnemonics anywhere in client code
- [ ] RPC endpoint is rate-limited - never expose a paid key in frontend JS
- [ ] Wallet adapter: using latest `@solana/wallet-adapter` - no forks
- [ ] Transaction simulation before signing (never blind-sign)

### 8. Devnet Dress Rehearsal

- [ ] Full launch sequence executed on devnet within 48h of mainnet launch
- [ ] LP seeding tested at mainnet-equivalent amounts
- [ ] Jito bundle tested on devnet or Jito devnet equivalent
- [ ] At least 3 different wallet types tested end-to-end

## Automatic Fail Conditions

If any of these are true, stop. Do not launch.

| Condition | Risk |
|---|---|
| No third-party audit | Existential |
| Single key upgrade authority | Existential |
| Unresolved Critical/High findings | Existential |
| Mint authority held by team EOA | Critical |
| Price oracle = single AMM spot | Critical |
| Admin keys not in multisig | Critical |

## Security Resources

Deep program analysis → load `solana-auditor-skill/SKILL.md`

Squads multisig setup → https://docs.squads.so

Anchor security best practices → https://www.anchor-lang.com/docs/security

Neodyme security workshop → https://workshop.neodyme.io
