# SISYPHUS // 15 — release site

Static one-pager for the **SISYPHUS // 15** custom map / gameplay mod for *White Knuckle*.
Plain light layout in the spirit of archlinux.org (white background, blue links,
system sans-serif). No build step, no dependencies, no CDN.

```
index.html      markup + all copy
styles.css      light archlinux.org-style sheet, responsive
app.js          ~70 lines: copy links, missing-screenshot slots, unfilled link slots
assets/renders/ render_01.jpg .. render_06.jpg       (gallery)
downloads/      SISYPHUS_15_v1.0.zip                (release archive)
```

## What to fill in before publishing

| What | Where |
|---|---|
| Release archive | `downloads/SISYPHUS_15_v1.0.zip` |
| Screenshots | `assets/renders/render_01.jpg` … `render_06.jpg` |
| File size | `index.html` — both `data-field="size"` spots (download line + release table) |
| SHA-256 | `index.html` — `<code data-field="sha256">` in the release table |
| Version | `index.html` — `data-field="version"`, the `href` and text of the download link, `<title>` |
| Author name | `index.html` — `data-field="author"` (currently `Mike`) |
| Discord invite | `index.html` — `<a data-link="discord">` in Credits, replace `href="#"` |
| Steam Wishlist | `index.html` — `<a data-link="steam-wishlist">` in the Optional block, replace `href="#"` |
| Wallet addresses | `index.html` — `data-field="wallet-eth"`, `wallet-sol`, `wallet-ton` (filled in) |

Get the hash with:

```bash
sha256sum downloads/SISYPHUS_15_v1.0.zip
```

Any link still left at `href="#"` hides its own slot — the table row, or the inline
`· Discord (WK // Maps & Mods)` span in Credits — so an unfilled link never renders as a dead
link. The `Support (optional)` block at the bottom is a collapsed `<details>`; if every
row in it ends up hidden, the block disappears as well.

Screenshots that are not present show a dashed "no screenshot yet" box instead of a
broken image. Each thumbnail links to the full-size file.

## Run locally

```bash
python3 -m http.server 8080 --directory .
```

…then open <http://localhost:8080>. Double-clicking `index.html` (`file://`) also
works; only the `copy` links fall back to the legacy clipboard path there.

## Deploy

* **GitHub Pages** — push to a repo, Settings → Pages → Branch `main`, folder `/ (root)`
* **Cloudflare Pages / Netlify** — drag the folder into the dashboard, no build command, publish dir `.`

GitHub's 100 MB per-file limit applies to `downloads/SISYPHUS_15_v1.0.zip`; if the
archive is bigger, host it as a GitHub Release asset and point the download
button at that URL instead.
