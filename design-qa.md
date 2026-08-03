# Design QA

## Scope

- Product: Haramrit Khurana portfolio
- Source of visual truth: the existing cinematic dark-grid portfolio captured before this recommendation pass
- Intended changes: dual SDE/MLE positioning, Personal Systems moved before Experience, revised proof language, denser mobile first impression, stronger secondary-text legibility, and direct project-demo access
- Required fidelity surfaces: typography, grid and border system, dark/green palette, information hierarchy, responsive behavior, filters, navigation, project disclosure states, and content accuracy

## Evidence

| State | Viewport | Reference | Implementation | Combined comparison |
| --- | --- | --- | --- | --- |
| Desktop hero | 1440 × 900 CSS px | `portfolio-audit/01-first-impression.png` | `portfolio-implementation/01-desktop-hero.png` | `portfolio-implementation/06-desktop-comparison.png` |
| Personal Systems | 1440 × 900 CSS px | `portfolio-audit/03-personal-systems.png` | `portfolio-implementation/02-personal-systems.png` | Direct state review |
| Applied ML lens | 1440 × 900 CSS px | `portfolio-audit/04-applied-ml-lens.png` | `portfolio-implementation/03-applied-ml-lens.png` | Direct state review |
| Mobile hero | 390 × 844 CSS px | `portfolio-audit/07-mobile-first-impression.png` | `portfolio-implementation/04-mobile-hero.png` | `portfolio-implementation/07-mobile-comparison.png` |
| Mobile navigation | 390 × 844 CSS px | `portfolio-audit/08-mobile-navigation.png` | `portfolio-implementation/05-mobile-navigation.png` | Direct state review |

Screenshots were captured at device scale factor 1, so CSS and pixel dimensions match. The full-frame desktop and mobile comparisons were used to judge retained visual-system fidelity. Focused state captures were used where interaction behavior—not a static full-page match—was the recommendation under review.

## Checks performed

- Typography: retained the original display/body/monospace hierarchy; the new role signal uses the existing monospace system and does not compete with the hero.
- Layout and spacing: retained the grid, borders, rails, section rhythm, and restrained geometry. The mobile hero was compacted enough to expose the first proof without crushing the headline.
- Colors and contrast: retained the palette; raised muted text and micro-label sizes for improved legibility while preserving the subdued hierarchy.
- Responsive behavior: checked desktop at 1440 × 900 and mobile at 390 × 844. No overlap, clipping, awkward control wrapping, or horizontal overflow observed.
- Content: reconciled the ticket claim as `≤2K`, added a quiet SDE/MLE range signal, and described classifAI's 63K score as pseudo-label agreement rather than human accuracy.
- States and interactions: verified desktop navigation, mobile navigation, project disclosure, role-lens selection, first-matching-project expansion, direct demo links, and stable lens scroll position.
- Accessibility: navigation and filters expose semantic names and pressed/expanded state; visible focus styling remains intact; tap targets remain practical; reduced-motion behavior is preserved.
- Browser diagnostics: no runtime warnings or errors were reported during the final interaction pass.

## Findings and resolution history

1. P1 — Role-lens selection moved the section out of view. Resolved by preserving the lens console's viewport position and opening the first matching project.
2. P1 — Mobile first impression delayed proof below the fold. Resolved by tightening hero spacing and responsive type while retaining readability; `≤2K` is now visible at 390 × 844.
3. P1 — Portfolio sequence underplayed independent systems thinking. Resolved by moving Personal Systems before Experience and linking it from both navigation systems.
4. P1 — classifAI proof could be read as human-validated accuracy. Resolved by explicitly labeling the result as heuristic-label agreement on a pseudo-labeled holdout.
5. P2 — Project demos were buried after long story copy. Resolved by moving live and source links directly under each project's technology signal and shortening story copy.
6. P2 — Secondary labels were too faint or small. Resolved by increasing the muted token and targeted micro-label sizes.
7. P2 — The top-level positioning read as SDE-only. Resolved by adding the quiet `Software systems / Applied ML` signal and replacing the enterprise profile proof with Applied ML.

## Final result

passed

## Header wordmark morph correction

- Source asset: `public/favicon copy.png`
- Resting evidence: `header-morph/01-default-fixed.png`
- Interactive evidence: `header-morph/02-hover-focus.png`
- Focused comparison: `header-morph/03-comparison.png`
- The original `HK.` wordmark remains on one line at rest and morphs into the gold H mark on hover or keyboard focus.
- Both states share a fixed 44 × 44 CSS-pixel footprint, preventing navigation movement during the transition.
- The earlier footer-seal treatment was removed so the mark has one intentional location.
- Unit test, production build, and browser-console checks passed. No P0, P1, or P2 regressions found.
