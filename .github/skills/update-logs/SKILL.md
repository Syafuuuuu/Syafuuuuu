---
name: update-logs
description: "Use when creating or updating UpdateLogs.md from GitHub commit or push changes. Analyze the actual Git diff and changed files, not only commit messages, to derive version numbers, features, fixes, refactors, breaking changes, documentation, deployment changes, and validation notes."
---

# Update Logs Skill

Create or update the repository's `UpdateLogs.md` from the code changes introduced by one or more GitHub commits or pushes.

## Core Rule

Treat the Git diff as the source of truth.

Commit messages, pull request titles, and issue descriptions may provide context, but they must not be used as the primary evidence for what changed. Inspect the changed files, patches, tests, configuration, and deployment changes before writing the log.

Do not claim behavior that is not supported by the diff or by validation evidence.

## Inputs

Determine the comparison range from the user's request. Prefer, in order:

1. An explicitly provided commit range, such as `OLD_SHA..NEW_SHA`.
2. The last logged commit/version in `UpdateLogs.md` compared with the current `HEAD`.
3. The most recent pushed commit compared with its first parent.
4. The current working tree diff, including staged and unstaged changes, when the user asks for an unreleased update.

If the range is ambiguous, inspect the repository state and use the narrowest defensible comparison. State the chosen range in the generated log.

## Required Git Inspection

Before writing `UpdateLogs.md`, inspect:

- `git status --short`
- `git log --oneline --decorate` for the relevant range
- `git diff --stat <range>`
- `git diff --find-renames <range>`
- `git diff --name-status <range>`
- Relevant tests, build files, workflows, and documentation touched by the diff

For a working tree update, inspect both:

- `git diff`
- `git diff --cached`

Use targeted reads of changed files when the patch is large. Do not scan unrelated history unless needed to determine the previous version.

## Versioning Rules

Use Semantic Versioning when the repository does not define another versioning convention:

- Major: incompatible public behavior, API, data model, deployment, or migration changes.
- Minor: backward-compatible features, new archive capabilities, new pages, new components, or new user-visible functionality.
- Patch: bug fixes, visual corrections, accessibility fixes, dependency maintenance, or documentation-only changes.

Find the current version from the repository before choosing the next one. Check, in order:

- `package.json`
- `pyproject.toml`
- `setup.cfg`
- `Cargo.toml`
- Existing `UpdateLogs.md`
- Git tags

If no version exists, start at `0.1.0` for the first documented feature release or `0.0.1` for an initial maintenance entry. Do not invent a version if the repository clearly uses a different scheme.

When the diff contains several categories, choose the highest-impact version bump and explain the reason briefly.

## Categorize Changes

Organize changes based on observed behavior and code impact:

- **Added**: new features, pages, components, content models, commands, assets, or workflows.
- **Changed**: modified behavior, visual direction, architecture, dependencies, or deployment configuration.
- **Fixed**: corrected bugs, layout regressions, broken interactions, accessibility issues, or deployment failures.
- **Removed**: deleted features, deprecated code, retired dependencies, or removed assets.
- **Refactored**: internal restructuring with no intended user-visible behavior change.
- **Performance**: measurable or clearly intended loading/runtime improvements.
- **Accessibility**: keyboard, focus, semantic HTML, contrast, reduced-motion, or screen-reader improvements.
- **Deployment**: CI/CD, GitHub Pages, hosting, environment, or build changes.
- **Documentation**: README, handoff, design direction, or developer documentation changes.
- **Breaking Changes**: incompatible behavior, API, data, URL, build, or setup changes.

Only include categories that are supported by the diff.

## User-Visible Summary

Describe what a visitor or developer can actually experience. Prefer concrete language:

- “Added URL-addressable archive entry dialogs.”
- “Changed the homepage from a server-rendered template to a React/Vite build.”
- “Fixed the featured image collapsing in the production layout.”
- “Added GitHub Pages deployment through the Pages artifact workflow.”

Avoid vague statements such as “improved code” unless the diff supports a specific explanation.

## Validation

Look for evidence in:

- Test commands run by the user or agent.
- Build output.
- Lint/typecheck output.
- Browser or runtime checks.
- GitHub Actions results supplied by the user.

Separate verified behavior from inferred behavior. Use wording such as:

- `Verified: npm run build succeeds.`
- `Verified: ArrowRight advances the archive modal.`
- `Not verified: production GitHub Pages deployment.`

Do not mark a change as tested merely because a test file exists.

## UpdateLogs.md Format

Create `UpdateLogs.md` if it does not exist. Preserve existing entries and add the newest entry at the top below the title and introductory text.

Use this format:

```markdown
# Update Logs

A chronological record of repository changes derived from code and configuration diffs.

## vX.Y.Z - YYYY-MM-DD

**Comparison:** `<old-ref>..<new-ref>`
**Release type:** Feature | Fix | Maintenance | Breaking change

### Added

- Concrete change with relevant file or component references.

### Changed

- Concrete behavior or architecture change.

### Fixed

- Bug or regression and the resulting behavior.

### Deployment

- CI/CD or hosting changes.

### Validation

- Verified commands and runtime checks.
- Remaining unverified areas, if any.

### Notes

- Migration notes, follow-up work, or known limitations.
```

Do not include empty headings. If a category has no changes, omit it.

## File References

Use repository-relative markdown links when possible:

```markdown
- Added archive state handling in [App.jsx](src/App.jsx).
- Updated deployment in [pages.yml](.github/workflows/pages.yml).
```

Do not cite only a commit message when a changed file can support the statement.

## Existing Log Maintenance

When updating an existing `UpdateLogs.md`:

- Never rewrite historical entries merely to improve wording.
- Do not duplicate a commit range already logged.
- Preserve the established heading and version style if it differs from this template.
- Add a short correction note if a previous entry was materially inaccurate.
- Keep entries concise but complete enough for a future developer or LLM to understand the evolution of the project.

## Final Response

After updating the file, report:

1. The comparison range used.
2. The version assigned and why.
3. The categories recorded.
4. The validation performed.
5. Any uncertainty or follow-up work.

The final response should distinguish facts from inference and mention when the GitHub deployment result was not available locally.
