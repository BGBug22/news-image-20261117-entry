# Tuesday 17 November 2026 — The Day in World News — make.fun `news-image-20261117`

[![make.fun](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/c/news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/BGBug22/news-image-20261117-entry/rank.svg)](https://make.fun/c/news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/BGBug22/news-image-20261117-entry/reward.svg)](https://make.fun/c/news-image-20261117)

A one-page newspaper front page summing up Tuesday 17 November 2026's world
news in a single 1024x1024 image: 41 stories across 6 continents.

- **Top stories:** Ukraine says a Crimean Bridge road span fell into the sea;
  Iran sends drones at a US radar in Bahrain and the US hits back; Trump holds
  his first Quad summit in Manila.
- **Also inside:** Ebola cases in DR Congo top 11,000; COP31 split over a
  fossil-fuel phase-out; the US, Mexico and Bolivia lose measles-free status;
  Nvidia's sales double to $115.8bn; Gaza's truce at risk; Mongolia's president
  says he will resign; and 28 more stories, with a dotted world map.
- **How it is made:** the three top illustrations are original flat editorial
  map diagrams; every word on the page is drawn with PIL (no AI-generated text),
  so nothing is garbled at any size.

## Run

```sh
node main.ts            # writes entry.png to /output (or $MAKEFUN_OUTPUT_DIR)
```

`main.ts` (Node 22, standard library only) validates the PNG signature and
IHDR chunk, checks the 1 MiB size limit, and writes the exact source bytes, so
both runs are byte-identical. No network is used.
