# Look Up — a whale breaches the sky

Entry for the make.fun competition **ai-excited-01** ("Make the AI judge excited").

## Concept

A gigantic humpback whale leaps out of a sea of golden clouds at sunset,
while a tiny lighthouse and one lone figure on a cliff below look up at the
impossible sight. The words "LOOK UP" are written across the sky — an
invitation to the judge to do exactly that. Scale, surprise and momentum in
one frame: the biggest animal on Earth where it cannot possibly be.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program writes `entry.png` (1024×1024 PNG) into the output directory.
It is deterministic: every run produces byte-identical output.
