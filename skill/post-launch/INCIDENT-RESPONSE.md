# Incident Response

Speed and clarity beat perfection. Say what you know, say what you do not know, say what you are doing.

## Incident Classification

| Level | Definition | Response time |
|---|---|---|
| P0 - Critical | Active exploit, funds at risk, protocol frozen | Under 5 minutes |
| P1 - High | Price anomaly above 30%, RPC outage, large unexpected transaction | Under 15 minutes |
| P2 - Medium | UI down, minor contract bug found, data inaccuracy | Under 1 hour |
| P3 - Low | Performance degradation, minor UI bug, community confusion | Under 24 hours |

## P0: Active Exploit Response

### First 5 minutes

```
T+0:00 - Monitoring alerts. Launch Lead called immediately.
T+0:02 - Identify: is this confirmed exploit or suspected?
T+0:03 - IF confirmed: pause protocol (if pause function exists) via multisig
T+0:05 - War room opens. Auditor/security contact called.
```

### Pause Protocol (if implemented)

```typescript
const pauseIx = program.instruction.pause({
  accounts: {
    authority: emergencyMultisig,
    protocolState: protocolStatePDA,
  },
});
// Submit immediately via Jito bundle with high tip
```

### Communication Protocol

First public message within 10 minutes of confirmation:

```
We are investigating an issue with [protocol name].
As a precaution, we have paused [specific function].
User funds in [specific vault/pool] are [safe/at risk - be honest].
We will update in 30 minutes.
Do not interact with the protocol until further notice.
```

Rules for incident communication:
1. Post in Discord announcements and Twitter simultaneously
2. Never speculate about cause in public until you know
3. Never promise fund recovery you cannot guarantee
4. Update every 30 minutes even if just to say "still investigating"
5. Never go silent - silence is interpreted as worse than the reality

### Post-Exploit Forensics

```bash
# Get all transactions to your program in a time window via Helius Enhanced Transactions API
curl "https://api.helius.xyz/v0/addresses/{PROGRAM_ID}/transactions?api-key={KEY}&type=UNKNOWN&before={LAST_TX_SIG}" | jq '.[] | {sig: .signature, ts: .timestamp}'

# Get full transaction detail
curl "https://api.helius.xyz/v0/transactions?api-key={KEY}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"transactions": ["{TX_SIG}"]}'
```

### Exploit Post-Mortem Template

Publish within 72 hours of incident:

```markdown
## Post-Mortem: [Protocol] [Incident Type] - [Date]

### Summary
[1-3 sentences: what happened, what was lost, what was not affected]

### Timeline
[T+0:00] - [Event]
[T+0:05] - [Response]

### Root Cause
[Technical explanation. Be specific. Vague explanations destroy trust.]

### Impact
- Funds affected: [amount]
- Users affected: [count]
- Protocol state: [current status]

### Remediation
- Immediate: [what was done within 24h]
- Short-term: [within 1 week]
- Long-term: [architecture changes]

### Compensation Plan (if applicable)
[How affected users are made whole, timeline, on-chain mechanism]
```

## Rug Accusation Response

If the community accuses you of rugging when you have not:

Do not argue, get defensive, or threaten legal action in Discord.

Do:
1. Post on-chain evidence immediately: LP lock transaction hash, team vesting transaction hashes, multisig setup
2. Explain what happened plainly (large unlock? normal operation? misunderstood transaction?)
3. Invite the accusers to verify on-chain themselves
4. Keep tone neutral and factual

The best prevention is pre-built trust infrastructure: LP locked on-chain before launch (published at launch), team vesting on-chain (verifiable, not "trust us"), multisig for all admin functions (public key holders listed), regular on-chain reports.

## Price Crash Response

A sudden price drop of 40% or more in under 1 hour is an incident.

First check - is this organic or an attack?

```bash
# Check largest sells in last 2 hours on Birdeye or DexScreener
# Look for: single wallet selling more than 2% of supply, coordinated multi-wallet pattern
# Use Helius to trace wallet funding sources
```

**Organic crash (market conditions, sell pressure):**
- Do not promise "we will support the price" (market manipulation risk)
- Post a transparent update: "volume spike, investigating, here is what we see"
- Consider pausing discretionary emissions if they are contributing to supply pressure

**Coordinated attack or manipulation:**
- Document all on-chain evidence
- Report to Solana ecosystem security contacts
- Consult legal counsel if significant market manipulation
- Do not attempt to retaliate on-chain

## RPC / Infrastructure Outage

**Immediate fallback steps:**
1. Switch to backup RPC (you should have 2+ providers configured)
2. If single-provider failure: update frontend env to backup RPC and redeploy
3. If widespread outage: post status update citing RPC provider issue

**Backup RPC architecture:**

```typescript
const RPC_ENDPOINTS = [
  process.env.PRIMARY_RPC!,    // Helius
  process.env.BACKUP_RPC!,     // QuickNode
  process.env.FALLBACK_RPC!,   // Triton / public
];

async function getHealthyConnection(): Promise<Connection> {
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const conn = new Connection(endpoint, 'confirmed');
      await conn.getSlot();
      return conn;
    } catch {
      continue;
    }
  }
  throw new Error('All RPC endpoints unhealthy');
}
```

## Incident Response Contacts

Pre-fill before launch:

| Contact | Handle / Email | When to use |
|---|---|---|
| Lead auditor | | Security incident |
| RPC provider support | | Infrastructure |
| Legal counsel | | Regulatory, fund loss |
| Market maker (if engaged) | | Liquidity emergency |
| Jito support | Jito Discord | Bundle/MEV issues |
| Solana Foundation security | security@solana.org | Critical program bugs |
