# Design System Strategy: The Precision Architect

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Precision Architect."** 

This system moves away from the "standard" resume template by treating the CV as a high-end technical dossier. It balances the cold, clinical precision of data engineering with the editorial elegance of a luxury architecture magazine. We achieve this through "The Grid of Logic"—an intentional use of asymmetric layouts where content breathes within large margins, punctuated by high-contrast typography and subtle, data-driven textures. The goal is to make the candidate feel like an authority who brings order to chaos.

## 2. Colors & Tonal Surface Philosophy
The palette is a sophisticated range of deep obsidian blues, slate grays, and clinical whites. 

*   **The "No-Line" Rule:** To ensure a premium, editorial feel, designers are strictly prohibited from using 1px solid borders to define sections. Instead, boundaries must be created through background color shifts. For example, a "Projects" section should be wrapped in `surface_container_low` against a `surface` background.
*   **Surface Hierarchy & Nesting:** We treat the UI as physical layers.
    *   **Base:** `surface` (#f7f9fb)
    *   **Floating Elements:** `surface_container_lowest` (#ffffff)
    *   **Nested Content:** `surface_container` (#eceef0)
*   **The "Glass & Gradient" Rule:** To reflect the "AI" aspect of the engineer's profile, use glassmorphism for floating headers or skill tags. Apply `surface_container_lowest` with a 70% opacity and a 12px backdrop-blur. 
*   **Signature Textures:** For hero sections or data visualizations, use a subtle linear gradient from `primary_container` (#131b2e) to `on_primary_fixed_variant` (#3f465c). This creates a "deep space" depth that flat colors lack.

## 3. Typography: The Narrative of Logic
The system utilizes a dual-font approach to signify the bridge between human logic and machine execution.

*   **Headings (Space Grotesk):** This typeface provides a tech-focused, geometric personality. Use `display-lg` for the candidate's name to command immediate attention. The wide apertures and "tech" feel of Space Grotesk reflect the Data/AI focus.
*   **Body (Inter):** This is the clinical workhorse. Used for descriptions and technical specs, it ensures maximum readability at small scales (`body-sm`).
*   **Typographic Hierarchy:** 
    *   **Section Headers:** Use `headline-sm` in `on_surface` with a heavy weight, paired with a sub-label in `secondary` using `label-md` for a "meta-data" aesthetic.
    *   **Data Points:** Use `title-md` in `on_tertiary_container` for key metrics (e.g., "99.9% Accuracy") to make them pop against the slate background.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "heavy" for a clean tech aesthetic. We utilize **Tonal Sculpting**.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place a `surface_container_highest` card on top of a `surface_container_low` section. This creates a soft, natural lift without visual noise.
*   **Ambient Shadows:** If an element must float (e.g., a floating contact button), use a "Deep Tech Shadow": `0px 24px 48px rgba(19, 27, 46, 0.06)`. This uses the `primary_container` blue as the shadow base rather than black, keeping the light soft and integrated.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at 15% opacity. Never use 100% opacity for borders; it breaks the editorial flow.
*   **Minimalist Data Elements:** Incorporate a 24px dot-grid pattern using `outline_variant` at 10% opacity in the background of the Hero section to subtly reference data architecture.

## 5. Components

### Buttons
*   **Primary:** Fill with `primary_container`, text in `primary_fixed_dim`. Use `md` (0.375rem) roundedness. No border.
*   **Tertiary (Tech Tags):** Use `surface_container_high` with `on_surface_variant` text. These should feel like "data nodes" rather than clickable CTAs.

### Chips (Skill Clusters)
*   **Styling:** Use `secondary_container` backgrounds with `on_secondary_container` text. 
*   **Shape:** Use `full` (9999px) roundedness for a pill shape to contrast against the rigid grid of the text blocks.

### Cards (Experience & Education)
*   **Structure:** Forbidden use of divider lines. Separate "Experience" entries using 32px of vertical white space from the Spacing Scale. 
*   **Interaction:** On hover, transition the background from `surface` to `surface_container_low` and apply a "Ghost Border" to suggest interactivity.

### Technical Input Fields (Search/Filters)
*   **Style:** Minimalist. Use `surface_container_highest` with a bottom-only "Ghost Border." Focus state should transition the bottom border to `on_tertiary_container`.

### Data Visualization Components
*   **Sparklines:** For "Skill Proficiency," use 2px thick lines in `tertiary`. Avoid bars; use fluid lines to represent "growth" and "flow."

## 6. Do's and Don'ts

### Do:
*   **Use Intentional Asymmetry:** Align descriptions to a 12-column grid but leave the first 3 columns empty for a "hanging" header look.
*   **Embrace Whitespace:** Treat whitespace as a structural element, not "empty" space. 
*   **Color-Code Logic:** Use `tertiary` (#000000) for technical keywords within a body of text to create a scannable "code-like" feel.

### Don't:
*   **Don't use pure black text:** Always use `on_surface` (#191c1e) to prevent eye strain and maintain the slate-gray aesthetic.
*   **Don't use standard shadows:** Avoid Material Design's default "elevation-1" shadows; they look "templated." Stick to tonal layering.
*   **Don't use iconography overload:** Use icons only for contact info. For tech skills, let the typography (Space Grotesk) do the heavy lifting.