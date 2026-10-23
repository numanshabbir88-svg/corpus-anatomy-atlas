CORPUS — FINAL SITEWIDE POINTER + CONTEXT-LABEL UPDATE

This is an update ZIP for the existing repository, not a full repository clone. It supersedes the earlier “final-sitewide-pointer-fixes-complete.zip”. It includes the prior sitewide pointer work, audited microscope-lens fixes, four new teaching plates, and the requested review of all 345 context-only entries.

CONTEXT-ONLY REVIEW
• All 345 entries remain included and receive an explicit on-page status label.
• 115 have an exact visible pointer on an appropriate image/plate. Where the feature is not on the chapter overview, the pointer is on the matching reference plate and the UI says so.
• 230 remain intentionally unpinned and are labeled “Context only” / “not individually marked” with a clear note. These include abstract terms, stages, and features that cannot be separated reliably in the available image. No speculative pins were added.
• Representative tooth-class images are not presented as pins for individual tooth positions; the labelled dental chart remains the source for those positions.

APPLY IT
1. Download this ZIP.
2. In File Explorer, right-click it and choose “Extract All…”.
3. Choose the root folder of your existing GitHub repository — the folder that contains index.html.
4. If asked whether to replace files, choose “Replace the files in the destination”.
5. Open GitHub Desktop and review the changed/added files.
6. Do not upload site/ manually. Netlify runs build_seo.py and verify_seo.py during deployment.

QA
• Preview build: 79 pages, 0 sitemap URLs; verifier passed.
• Production-mode build: 79 pages, 78 sitemap URLs; verifier passed.
• Static audit confirms 345 context-only status labels, 115 pointed previews, 230 clearly unpointed context previews, and no missing context labels/notes.

Nothing has been committed or pushed by this assistant. You can review and push yourself in GitHub Desktop.
