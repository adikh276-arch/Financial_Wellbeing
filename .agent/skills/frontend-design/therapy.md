---
name: therapy-frontend-design
description: Applies the Therapy platform's official design system, brand guidelines, and UI consistency rules. Use this skill whenever building or modifying frontend components, pages, or activities in the Therapy app to ensure a beautifully consistent, calming, and uniform aesthetic. This covers colors, typography, shadows, components, and layout rules.
---

# Therapy Platform Design System & Brand Guidelines

## Overview

To ensure all activities and services across the Therapy platform are beautifully consistent, uniform, and provide a calming user experience, use this skill. It dictates the specific rules for colors, typography, shadows, components, and layout. 

**Keywords**: frontend design, therapy app, UI consistency, brand guidelines, styling, components, colors, typography, layout, shadows

## Design Philosophy

The Therapy platform's design must evoke **calmness, safety, empathy, and clarity**.
- **Avoid**: Harsh contrasts, pure black/white, sharp corners, dense layouts, and frantic animations.
- **Embrace**: Softness, generous whitespace, rounded geometry, soothing colors, and highly accessible text.

## 1. Color Palette

Always use these colors or their exact variants to maintain uniformity.

**Backgrounds:**
- **Primary Background**: `#F8FAFC` (Slate 50) - Use for the main app background to reduce eye strain.
- **Secondary Background**: `#FFFFFF` (Pure White) - Use for cards, modules, and elevated surfaces.
- **Accent Background**: `#F1F5F9` (Slate 100) - Use for subtle section highlights or disabled states.

**Text Colors:**
- **Primary Text**: `#1E293B` (Slate 800) - Use for headings and main body text. Never use pure black (`#000000`).
- **Secondary Text**: `#64748B` (Slate 500) - Use for subtitles, placeholders, empty states, and less important metadata.

**Brand/Accent Colors:**
- **Primary Accent**: `#3B82F6` (Calm Blue) - Use for primary actions, active states, and important links. It conveys trust.
- **Secondary Accent**: `#8B5CF6` (Soft Purple) - Use for creative or reflective activities (e.g., journaling, meditation).
- **Success/Positive**: `#10B981` (Soft Green) - Use for progress completion, success messages, and positive reinforcement.
- **Warning/Caution**: `#F59E0B` (Warm Amber) - Use for warnings or requiring user attention.
- **Destructive/Error**: `#EF4444` (Muted Red) - Use sparingly for errors or deleting data.

## 2. Typography

Typography must be highly legible and friendly.

- **Headings (H1 - H4)**: Use a rounded, friendly sans-serif font (e.g., *Nunito*, *Quicksand*, or default to *system-ui* with `font-weight: 700`).
- **Body Text**: Use a clean, highly readable sans-serif font (e.g., *Inter*, *Roboto*, or *system-ui* with `font-weight: 400`).
- **Sizing Rule**: 
  - Base size: `16px` (1rem) for body.
  - H1: `2.25rem` (36px), H2: `1.875rem` (30px), H3: `1.5rem` (24px).
- **Line Height**: Generous line height for readability. `1.6` for body text, `1.2` for headings.
- **Letter Spacing**: Normal or slightly loose (`0.01em`) to improve legibility.

## 3. Shadows & Elevation

Use soft, diffused shadows to create depth without harshness. Do not use generic browser box-shadows.

- **Level 1 (Cards, Buttons on hover)**: 
  `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);`
- **Level 2 (Modals, Dropdowns, Popovers)**: 
  `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);`
- **Level 3 (Sticky Headers, Floating Action Buttons)**:
  `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);`

## 4. Components

### Buttons
- **Shape**: Always use fully rounded/pill shapes (`border-radius: 9999px`) or heavily rounded corners (`border-radius: 1rem` / `16px`).
- **Primary Button**: Solid background (`#3B82F6`), white text, no border. Hover state dims slightly or adds Level 1 shadow.
- **Secondary Button**: Transparent background, border of `1px solid #E2E8F0`, text color `#1E293B`. Hover state changes background to `#F8FAFC`.
- **Ghost/Tertiary**: No border, no background. Text color `#64748B`. Hover state changes text to `#1E293B` and background to `#F1F5F9`.
- **Padding**: Generous padding, e.g., `padding: 0.75rem 1.5rem` for default, `1rem 2rem` for large call-to-actions.

### Cards (For Activities & Modules)
- **Border Radius**: Large and friendly, e.g., `border-radius: 1.5rem` (24px).
- **Border**: Subtle border `1px solid #F1F5F9` if shadow is not used, OR use Level 1 shadow with no border.
- **Padding**: Internal padding should be generous, at least `1.5rem` (24px) or `2rem` (32px).
- **Background**: Always pure white (`#FFFFFF`).

### Inputs & Forms
- **Border Radius**: `0.75rem` (12px).
- **Border**: `1px solid #CBD5E1`.
- **Background**: `#FFFFFF` or very light `#F8FAFC` for filled inputs.
- **Focus State**: Must have a clear focus ring, e.g., `box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); border-color: #3B82F6;`. Do not rely solely on default outline.
- **Padding**: `0.75rem 1rem`.

### Empty States & Loading
- **Empty States**: Center aligned, illustration or soft icon (color `#94A3B8`), secondary text (`#64748B`) explaining what to do, followed by a primary action button.
- **Loading States**: Prefer skeleton loaders over spinners for content. Use a soft pulsing animation (`opacity: 0.5` to `1`) with `#E2E8F0` background color.

## 5. Layout & Spacing

- **Grid System**: Use an 8pt grid system. All margins and paddings should be multiples of 8px (e.g., 8, 16, 24, 32, 48, 64).
- **Whitespace**: Favor generous whitespace. Elements should not feel cramped. It reduces cognitive load for users in therapy contexts.
- **Max Width**: Constrain content width to improve readability (e.g., max-width of `800px` for articles/reading, `1200px` for dashboards/grids).
- **Centering**: For reading tasks and solitary activities (like meditation or journaling), center the container on the screen.

## 6. Motion & Animations

- **Transitions**: Keep them soft and unhurried. Use `transition: all 0.3s ease-in-out` for hover states.
- **Page/Component Load**: Use gentle fade-ins (`opacity 0 to 1`) or slight upward slides (`translateY 10px to 0`).
- **Avoid**: Flashing, bouncing, or rapid pulsing, which can trigger anxiety or discomfort. Keep it grounded.

## 7. Accessibility (A11y)

- **Contrast**: Ensure all text meets at least WCAG AA contrast ratio. (e.g., `#64748B` on `#FFFFFF` is acceptable for secondary text).
- **Touch Targets**: Minimum `44x44px` for any clickable element (buttons, links, icon buttons on mobile).
- **Focus Rings**: Never remove focus rings (`outline: none`) without providing a custom visual focus state (as described in Inputs).
- **Semantics**: Use proper HTML5 semantic elements (`<nav>`, `<main>`, `<article>`, `<section>`).

## Implementation Rules

When applying this skill:
1. **Analyze First**: Review existing components in the codebase. If a global component exists that matches these rules, use it instead of building from scratch.
2. **Framework Alignment**: If using utility classes (like Tailwind CSS), stick strictly to the design tokens mentioned above (e.g., `bg-slate-50`, `text-slate-800`, `rounded-3xl`, `shadow-sm`).
3. **Responsive Design**: Always ensure layouts degrade gracefully on mobile devices. Use responsive padding (e.g., `1rem` on mobile, `2rem` on desktop) and stack columns to rows.
4. **Context Matters**: Tailor the aesthetic to the specific therapy activity. Journaling might need more focus on typography, while a mood tracker needs clear, distinct color coding.
