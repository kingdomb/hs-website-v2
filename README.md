# Holy Spirit Ministries website, v2 (neumorphic)

**Live:** https://kingdomb.github.io/hs-website-v2/

The second version: the same content and routes as v1 restyled as neumorphism on white with a
small amount of clay, a floating navbar, and plentiful gentle motion (with a motion setting that
honours reduced-motion). React 19 + Vite 6 + Tailwind CSS 3 + React Router 7. The first version
is in [hs-website-v1](https://github.com/kingdomb/hs-website-v1).

```bash
npm install
npm run dev      # http://127.0.0.1:5173/
npm run build    # base path /hs-website-v2/ (GitHub Pages)
npm run lint
npm run deploy   # build and publish dist/ to the gh-pages branch
```

Try `?motion=full`, `?motion=gentle` or `?motion=off` on any page to change the motion level.

## Documentation

- [`docs/site-refresh-v2.md`](docs/site-refresh-v2.md): what this version is, tokens, motion, accessibility, status
- [`docs/motion-inventory.md`](docs/motion-inventory.md): every animation, its trigger and its reduced-motion behaviour
- [`docs/accessibility-menu-placeholder.md`](docs/accessibility-menu-placeholder.md): what the planned accessibility menu must contain
- [`docs/superpowers/specs/`](docs/superpowers/specs/) and [`docs/superpowers/plans/`](docs/superpowers/plans/): design spec and implementation plan
- [`docs/image-credits.md`](docs/image-credits.md): image provenance

Content lives in `src/data/`. Add or change images with `python3 scripts/optimize-images.py`
(it writes responsive WebP variants into `src/assets/img/`).
The site is set to `noindex, nofollow` until the owner decides to go live.
