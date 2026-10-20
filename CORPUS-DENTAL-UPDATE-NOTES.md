# Corpus: dental-student chapter and skull/nerve continuity

## What is in this combined source package
- Existing skull/facial-bones guide with **22 separately named bones** (14 facial and eight cranial). Its eight visible front-view features have cautious pointers; deeper bones have named reading entries and a context image rather than pretend photo pins. There are **not** 22 separate 3D bone models or per-bone nerve overlays.
- Existing facial-nerve (CN VII) and trigeminal-nerve (CN V) chapters remain separate. CN VII concerns facial movement/taste/selected secretomotor routes; the dental-pulp sensory routes described here travel with CN V, not CN VII.
- New interactive `#/dentition` and crawlable `/learn/dentition/` guides have **76 entries**: 24 tissues/structures/orientation/nerve topics; all **32 permanent tooth positions (#1–#32)**; and all **20 primary positions (A–T)**. Permanent and primary charts carry FDI equivalents. Patient-right/left orientation is stated; narrow-screen jaw rows wrap by patient side. Chart positions open their named entries.
- Four representative adult tooth-class plates (molar section, incisor, canine, premolar), with responsive WebP/thumb versions. These are teaching models, **not individual numbered or primary tooth portraits**. Only plainly visible tissues on the molar cutaway receive approximate fine-line pointers. Individual numbered positions and soft-tissue/microscopic notes have **no invented plate pointers**.
- Upper dental sensation is routed through **CN V2 superior alveolar branches**; lower dental sensation through **CN V3 inferior alveolar nerve**. Branch variations and soft-tissue versus pulpal differences are described without promising a clinical nerve map for each tooth.

## Counts and checks
- **60 chapters**, **1,286 named chapter entries**, **165 interactive quiz questions**, **300 visible static Q&As**, **65 HTML pages**, **64 production sitemap URLs**.
- Production-mode SEO build and local link/canonical/sitemap audit pass. Dental guide counts, class-image disclosure, chart and nerve checks are enforced in the builder/verifier.
- Three-width browser checks (1440, 390, 320px) confirm both dental charts, click-to-entry behavior, contextual class images versus enamel pointer, skull continuity and no page errors/overflow. Existing body-map, microscopic lens, and reproductive imagery remain part of the source; do not delete prior `img/` assets.
- Packaged `learn/` pages are a safe, non-indexable local preview; the Git-connected production build regenerates indexable pages with the actual Netlify URL.
- **This is a Git-connected Netlify source ZIP, not a completed deployment or proof that the public site has changed.** Extract files at repository root, commit/push, and let Netlify build `site/`. See `NETLIFY-GIT-DEPLOY.md` and `SEO-DEPLOY-CHECKLIST.md`. Confirm the actual Netlify URL, generated canonicals and Search Console separately.
