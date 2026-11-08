# Contributing to solana-launch-skill

## Prerequisites

Before opening a pull request, run the repository checks:

```bash
node scripts/check-repo.mjs
```

All 62 checks must pass.

## Author attribution

Keep commit authorship with the repository owner (`maxxexee`). Do not add co-author or generated-by trailers. No em dashes or emojis in READMEs, docs, or commit messages.

## Contributor list

The contributor list must show only `maxxexee`. All commits must be authored by Maxx (<88834630+maxxexee@users.noreply.github.com>).

## Process

1. Fork the repo and create a branch off `main`
2. Make your changes
3. Run `node scripts/check-repo.mjs` - fix any failures
4. Commit with your own identity (no Codebuff trailers)
5. Push and open a PR against `maxxexee:main`

## House standard

- No em dashes (`-`, `-`)
- No emojis in any documentation
- All markdown files must pass `check-repo.mjs`
- Commit identities must be rewritten to the owner's noreply address after merge