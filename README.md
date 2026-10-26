# www.odinter.com

Static website for OD International Ltd., built for GitHub Pages. No build step is needed to publish.

## Publish
1. In the GitHub repository that serves www.odinter.com, delete the old site files (keep `CNAME`).
2. Upload everything in this folder to the repository root, including the `assets` and `zh` folders and the `.nojekyll` file.
3. In Settings → Pages, confirm the custom domain is `www.odinter.com` and that "Enforce HTTPS" is ticked.

## Structure
- English pages at the root; Traditional Chinese pages in `zh/`.
- Five service pages: `north-american-representation.html`, `canadian-product-sourcing.html`, `brand-management.html`, `go-to-market-consulting.html`, `international-grocery-market-expansion.html`; plus `factory-direct-sourcing.html`.
- `industry-expertise.html`, `about.html`, `insights.html` and seven articles, `contact.html`, `privacy.html`, `404.html`.
- `fcl-calculator.html`: the existing FCL load and freight calculator, kept as is with the Google tag added.
- `assets/css/site.css` (styles), `assets/js/site.js` (menu and forms), `assets/js/config.js` (settings), `assets/fonts/`, `assets/img/`.
- `canada-market-entry.html`, `export-to-asia.html` (and their `zh/` versions) and the old `index-zh.html` redirect to the matching new pages.

## Settings
- Google Analytics 4: Measurement ID `G-KPE9EBBY3J`, installed with Google's standard tag in the `<head>` of every page. Successful inquiries send a `generate_lead` event with the selected service. `assets/js/config.js` is no longer used and can be deleted.
- Forms post to Formspree form `xykqkobq`. A hidden `_gotcha` field filters spam. If Formspree's reCAPTCHA is on, visitors finish sending on Formspree's own page; switching it off keeps the confirmation on this site.

## Logo and photos
- Logo: `assets/img/odi-mark.svg` (colour) and `assets/img/odi-mark-white.svg` (footer), traced from the ODI logo PNG. Replace them with exports from the original vector file when available, keeping the same file names.
- Leadership photo: see the comment in `about.html` marked "Photo slot".
