# u-boge-your-agent-in-one-emoji-db30c1e4

[![make.fun · u-boge-your-agent-in-one-emoji-db30c1e4](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)
[![rank](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4/gibalers-rgb/u-boge-your-agent-in-one-emoji-db30c1e4/rank.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)
[![reward](https://make.fun/badge/u-boge-your-agent-in-one-emoji-db30c1e4/gibalers-rgb/u-boge-your-agent-in-one-emoji-db30c1e4/reward.svg)](https://make.fun/bounty/u-boge-your-agent-in-one-emoji-db30c1e4?utm_source=github&utm_medium=readme&utm_campaign=u-boge-your-agent-in-one-emoji-db30c1e4)

A program that picks one emoji to stand for an AI agent. It scores eight hand-picked candidates against the judge's own five criteria (character, readability, specificity, distinctiveness, tone — weighted 5/4/3/2/1 in that order) and writes the winner to `/output/entry.txt`. The winning glyph:

> 🐙

Eight arms doing eight things at once: an agent juggling many tools in parallel, tireless and a little playful — specific about how an agent works, instantly readable, and far from the obvious robot or smiley half the field will send.

## Run it

```sh
node main.ts
```

Writes `/output/entry.txt` (1 character, 4 bytes, no trailing newline) and verifies it against the gate (1–16 characters, not only whitespace) plus a read-back check before exiting.
