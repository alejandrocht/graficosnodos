# Update academic node attributes

## Goal

Align the graph metadata for Curso, Silabo, Competencia, Logros, and CoberturaCurricular with the attribute names supplied by the user. Preserve the graph's existing node identities and relations.

## Tasks

1. **Update the academic node attribute lists** — done. Updated the five requested node schemas and aligned the logro and coverage primary-key fields in `src/data.js`.
2. **Validate the change** — done. `npm run lint` and `npm run build` pass; Vite reports the existing large JavaScript chunk warning (1,653.81 kB, 458.26 kB gzip).
3. **Commit and push the feature branch** — in progress. Stage only this feature's files and leave pre-existing `.gitignore` and `.serena/project.yml` edits untouched.

## Verification evidence

- `npm run lint` — pass, no warnings.
- `npm run build` — pass; Vite warns that the JavaScript chunk is 1,653.81 kB (458.26 kB gzip), over the 500 kB threshold.
- Runtime harness — N/A: this is a metadata-only change; existing node selection and details-panel rendering are unchanged.

## Rollback boundary

Revert the academic metadata changes in `src/data.js` and remove `odd/tasks/update-academic-node-attributes.md`; do not revert unrelated working-tree edits.

## Acceptance criteria

- Curso, Silabo, Competencia, Logros, and CoberturaCurricular show exactly the requested attributes.
- Primary-key badges point to `id_curso`, `id_silabo`, `id_competencia`, `id_logro`, and `id_cob_Curricular` respectively.
- Lint and production build pass.
- The feature commit is pushed on `feat/academic-node-attributes` without including unrelated working-tree edits.
