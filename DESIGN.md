# Design System — Blend by Juspay

## 1. Visual Theme & Atmosphere

Blend is a fintech-grade, token-driven design system built for Juspay's payment infrastructure products. The visual language is **clinical yet approachable** — a clean, neutral canvas where information density is high but never overwhelming. Surfaces are light (`#FFFFFF` / `#F5F7FA`), text is near-black (`#0E121B` / `#222530`), and the singular brand accent is **Primary Blue** (`#2B7FFF`) — a confident, trustworthy blue that anchors CTAs, active states, and interactive feedback.

The typography uses **Inter Display** — a precision-engineered variable font optimized for UI density. Inter's tall x-height and open apertures ensure legibility at small sizes (10px body-xs through 14px body-md), which is critical for data-heavy financial dashboards. The system avoids decorative treatments entirely: no italics for emphasis, no display serifs, no gradient text. Weight 500 (medium) dominates UI chrome, 600 (semibold) marks headings and emphasis, and 400 (regular) handles body text and descriptions.

What distinguishes Blend is its **hierarchical token architecture**: foundation tokens (`FOUNDATION_THEME`) define primitives (colors, spacing, shadows, borders), and component tokens consume those primitives through factory functions that accept a `theme` parameter (`light` or `dark`). This two-layer system means every component is theme-aware by default. The shadow system is restrained — seven graduated levels from `xs` (barely perceptible 1px lift) to `full` (dramatic 48px depth) — keeping surfaces flat and data-forward rather than skeuomorphic. Border radii range from sharp (0px–4px for inline elements) to softly rounded (12px–20px for cards and modals) but never pill-shaped for containers — `9999px` is reserved for badges, tags, and avatar circles.

**Key Characteristics:**

- Neutral canvas: white (`#FFFFFF`) and cool gray (`#F5F7FA`) surfaces
- Primary Blue (`#2B7FFF`) as the singular brand accent for CTAs and active states
- Seven semantic color scales: gray, primary (blue), purple, orange, red, green, yellow — each with 11–15 shades from 50 to 950
- Inter Display for all UI text; SF Mono for code
- Two-layer token architecture: foundation → component, with light/dark theme switching
- Restrained shadow system: 7 elevation levels + 2 focus rings
- Near-black text (`#0E121B`) — deep and ink-like, not warm
- Fintech precision: high information density, data-table-ready, WCAG 2.1 AA compliant
- Radix UI primitives for accessibility; styled-components for dynamic theming

## 2. Color Palette & Roles

### Primary Brand

- **Primary Blue 500** (`#2B7FFF`): Brand accent, primary CTA background, active states, links
- **Primary Blue 600** (`#0561E2`): Hover state for primary actions
- **Primary Blue 700** (`#1447E6`): Pressed/active state
- **Primary Blue 50** (`#EFF6FF`): Primary tint background, focus ring fill, subtle highlights
- **Primary Blue 100** (`#DBEAFE`): Selected row background, light active surface
- **Primary Blue 200** (`#BEDBFF`): Soft accent borders, progress fills
- **Primary Blue 950** (`#162456`): Dark mode primary text accent

### Gray Scale (Neutral Foundation)

- **Gray 0** (`#FFFFFF`): Page background, card surfaces, input backgrounds
- **Gray 25** (`#FCFCFD`): Subtle alternate row background
- **Gray 50** (`#F5F7FA`): Secondary surfaces, sidebar background, input disabled bg
- **Gray 100** (`#F2F4F8`): Hover surfaces, table header background
- **Gray 150** (`#ECEFF3`): Dividers, subtle borders
- **Gray 200** (`#E1E4EA`): Default borders, input borders, card outlines
- **Gray 300** (`#CACFD8`): Stronger borders, disabled input borders
- **Gray 400** (`#99A0AE`): Placeholder text, disabled icons
- **Gray 500** (`#717784`): Secondary text, descriptions, captions
- **Gray 600** (`#525866`): Tertiary text, labels
- **Gray 700** (`#2B303B`): Strong secondary text, sub-headings
- **Gray 800** (`#222530`): Primary text (light theme), heading text
- **Gray 900** (`#181B25`): Strongest text, modal titles
- **Gray 950** (`#0E121B`): Near-black text, highest contrast — the primary text color
- **Gray 1000** (`#050506`): Absolute black, used sparingly

### Semantic Colors

**Red (Error / Danger)**

- **Red 500** (`#FB2C36`): Error text, destructive button background
- **Red 600** (`#E7000B`): Error hover
- **Red 100** (`#FFE2E2`): Error background tint
- **Red 200** (`#FFC9C9`): Focus ring for error states (`focusError` shadow)
- **Red 50** (`#FEF2F2`): Subtle error surface

**Green (Success)**

- **Green 500** (`#00C951`): Success indicators, positive status
- **Green 600** (`#00A63E`): Success hover
- **Green 100** (`#DCFCE7`): Success background tint
- **Green 50** (`#F0FDF4`): Subtle success surface

**Yellow (Warning)**

- **Yellow 500** (`#EFB100`): Warning indicators
- **Yellow 400** (`#FCC800`): Warning accent
- **Yellow 100** (`#FEF9C2`): Warning background tint
- **Yellow 50** (`#FEFCE8`): Subtle warning surface

**Orange (Attention)**

- **Orange 500** (`#FF6900`): Attention-grabbing elements
- **Orange 400** (`#FF8904`): Orange accent
- **Orange 100** (`#FFEDD4`): Orange background tint

**Purple (Premium / Feature)**

- **Purple 500** (`#AD46FF`): Premium features, special badges
- **Purple 600** (`#9810FA`): Purple hover
- **Purple 100** (`#F3E8FF`): Purple background tint

### Focus & Interactive

- **Focus Primary**: `0px 0px 0px 3px #EFF6FF` — blue ring on focus
- **Focus Error**: `0px 0px 0px 3px #FFC9C9` — red ring on error focus

## 3. Typography Rules

### Font Family

- **Primary (all UI)**: `InterDisplay`, fallbacks: `-apple-system, system-ui, Roboto, Helvetica Neue, sans-serif`
- **Code / Mono**: `SF Mono`, fallbacks: `Menlo, Monaco, Consolas, monospace`

### Hierarchy

| Role        | Font         | Size (px) | Weight | Line Height (px) | Letter Spacing | Notes                              |
| ----------- | ------------ | --------- | ------ | ---------------- | -------------- | ---------------------------------- |
| Display XL  | InterDisplay | 72        | 700    | 78               | 0              | Hero sections, landing pages       |
| Display LG  | InterDisplay | 64        | 700    | 70               | 0              | Page hero headings                 |
| Display MD  | InterDisplay | 56        | 700    | 64               | 0              | Section hero headings              |
| Display SM  | InterDisplay | 48        | 700    | 56               | 0              | Large section headings             |
| Heading 2XL | InterDisplay | 40        | 600    | 46               | 0              | Page titles                        |
| Heading XL  | InterDisplay | 32        | 600    | 38               | 0              | Section titles                     |
| Heading LG  | InterDisplay | 24        | 600    | 32               | 0              | Card headings, dialog titles       |
| Heading MD  | InterDisplay | 20        | 600    | 28               | 0              | Sub-section headings               |
| Heading SM  | InterDisplay | 18        | 600    | 24               | 0              | Small headings, sidebar titles     |
| Body LG     | InterDisplay | 16        | 400    | 24               | 0              | Primary body text, paragraphs      |
| Body MD     | InterDisplay | 14        | 400    | 20               | 0              | Standard UI text, descriptions     |
| Body SM     | InterDisplay | 12        | 400    | 18               | 0              | Secondary text, captions, metadata |
| Body XS     | InterDisplay | 10        | 400    | 14               | 0              | Micro text, badges, timestamps     |
| Code LG     | SF Mono      | 14        | 400    | 18               | 0              | Inline code, code blocks           |
| Code MD     | SF Mono      | 12        | 400    | 18               | 0              | Standard code text                 |
| Code SM     | SF Mono      | 10        | 400    | 14               | 0              | Small code, line numbers           |

### Weight Usage

| Weight   | Value | Usage                                                 |
| -------- | ----- | ----------------------------------------------------- |
| Regular  | 400   | Body text, descriptions, input values                 |
| Medium   | 500   | Buttons, nav items, emphasized body, input labels     |
| Semibold | 600   | Headings, table headers, active tabs, strong emphasis |
| Bold     | 700   | Display text, hero headings, stat numbers             |

### Letter Spacing Scale

| Name       | Value | Usage                                     |
| ---------- | ----- | ----------------------------------------- |
| Compressed | -2px  | Tight display headings for visual impact  |
| Condensed  | -1px  | Large headings                            |
| Normal     | 0     | Default — all standard UI text            |
| Expanded   | +1px  | Uppercase labels, small caps              |
| Extended   | +2px  | Wide-spaced decorative or micro uppercase |

### Principles

- **No letter-spacing on body text**: All body and heading sizes use `0` letter-spacing. The font is optimized for screen and needs no adjustment.
- **Weight 400–600 dominates**: 400 for body, 500 for interactive elements, 600 for headings. 700 is reserved for display sizes only.
- **px-based sizing**: All font sizes are defined in px (not rem) for pixel-perfect control in financial UI where alignment matters.
- **Tight line-heights on headings**: Headings use compact line-heights (e.g., 32/24 = 1.33 for Heading LG) to keep dashboards dense. Body uses relaxed line-heights (e.g., 20/14 = 1.43 for Body MD) for readability.

## 4. Component Stylings

### Buttons

**Primary**

- Background: `primary.500` (`#2B7FFF`)
- Text: `gray.0` (`#FFFFFF`)
- Border: none
- Radius: `8px`
- Sizes: `sm` (32px height), `md` (36px height), `lg` (40px height)
- Hover: `primary.600` (`#0561E2`)
- Active: `primary.700` (`#1447E6`)
- Focus: `focusPrimary` ring (`0px 0px 0px 3px #EFF6FF`)
- Disabled: `primary.200` (`#BEDBFF`) bg, `gray.0` text, opacity reduced

**Secondary**

- Background: `gray.0` (`#FFFFFF`)
- Text: `gray.950` (`#0E121B`)
- Border: `1px solid gray.200` (`#E1E4EA`)
- Radius: `8px`
- Hover: `gray.50` (`#F5F7FA`) background
- Active: `gray.100` (`#F2F4F8`) background

**Danger**

- Background: `red.500` (`#FB2C36`)
- Text: `gray.0` (`#FFFFFF`)
- Hover: `red.600` (`#E7000B`)
- Focus: `focusError` ring (`0px 0px 0px 3px #FFC9C9`)

**Success**

- Background: `green.600` (`#00A63E`)
- Text: `gray.0` (`#FFFFFF`)
- Hover: `green.700` (`#008236`)

**Button SubTypes**: `default` (text + optional icon), `iconOnly` (square), `inline` (text-only, no background)

### Inputs (TextInput, NumberInput, SearchInput, etc.)

- Background: `gray.0` (`#FFFFFF`)
- Border: `1px solid gray.200` (`#E1E4EA`)
- Radius: `8px`
- Text: `gray.950` (`#0E121B`), 14px weight 400
- Placeholder: `gray.400` (`#99A0AE`)
- Sizes: `sm` (32px), `md` (36px), `lg` (40px)
- Hover: border `gray.300` (`#CACFD8`)
- Focus: border `primary.500` (`#2B7FFF`) + `focusPrimary` shadow ring
- Error: border `red.500` (`#FB2C36`) + `focusError` shadow ring on focus
- Disabled: background `gray.50` (`#F5F7FA`), text `gray.400`, border `gray.200`
- Labels: 12px weight 500 `gray.700` (`#2B303B`), above input
- Helper/Error text: 12px weight 400, `gray.500` or `red.500`

### Cards

- Background: `gray.0` (`#FFFFFF`)
- Border: `1px solid gray.200` (`#E1E4EA`)
- Radius: `12px`
- Shadow: `sm` (`0px 2px 3px 0px rgba(5, 5, 6, 0.05)`) or `md` on hover
- Padding: `16px` to `24px`
- Hover state (interactive cards): shadow elevates to `md` or `lg`

### Tags / Badges

- SubTypes: `noFill`, `attentive` (filled), `subtle` (tinted background)
- Shapes: `rounded` (4px radius), `squarical` (moderate radius)
- Sizes: `xs` (20px), `sm` (24px), `md` (28px), `lg` (32px)
- Colors: mapped to all seven semantic palettes (gray, primary, red, green, yellow, orange, purple)
- Text: 12px weight 500 (sm/md), 10px weight 600 (xs)
- Radius: `full` (`9999px`) for pill tags, `6px` for squarical

### Alerts

- Variants: `primary`, `success`, `warning`, `error`, `purple`, `orange`, `neutral`
- SubTypes: `subtle` (tinted background), `noFill` (border only)
- Structure: icon + title + description + optional close button + optional actions
- Radius: `8px` to `12px`
- Padding: `12px` to `16px`

### Selectors (Checkbox, Radio, Switch)

- Sizes: `sm` (16px), `md` (20px), `lg` (24px)
- Unchecked: border `gray.300` (`#CACFD8`), background `gray.0`
- Checked: background `primary.500` (`#2B7FFF`), checkmark `gray.0`
- Hover: border `primary.400` (`#51A2FF`)
- Error: border `red.500`, focus ring `focusError`
- Disabled: background `gray.100`, border `gray.200`, opacity reduced
- Switch track: `gray.200` (off) → `primary.500` (on), with `gray.0` thumb

### Tabs

- Variants: `underline`, `boxed`, `floating`, `pills`
- Sizes: `md`, `lg`
- Active tab: `primary.500` text/indicator (underline), or `primary.500` bg with `gray.0` text (pills)
- Inactive: `gray.500` text
- Hover: `gray.700` text

### Select / Dropdown Menus

- Trigger: same styling as TextInput
- Menu surface: `gray.0` background, `shadow.lg`, radius `12px`
- Menu item: 14px text, `8px` horizontal padding, `6px` vertical
- Item hover: `gray.50` (`#F5F7FA`) background
- Item active/selected: `primary.50` (`#EFF6FF`) background, `primary.500` text
- Disabled item: `gray.400` text, no hover

### Modals & Drawers

- Overlay: `gray.1000` at 50% opacity (`rgba(5, 5, 6, 0.5)`)
- Surface: `gray.0` background, `shadow.2xl`, radius `16px` (modal), `12px` (drawer)
- Header: 20px weight 600, `gray.950` text, with optional close button
- Padding: `24px`
- Footer: right-aligned action buttons with `12px` gap

### Tooltips & Popovers

- Tooltip: `gray.950` background, `gray.0` text (dark tooltip), radius `8px`, `shadow.md`
- Popover: `gray.0` background, `shadow.lg`, radius `12px`, `1px solid gray.200` border
- Sizes: `sm`, `md`, `lg`

### Sidebar & Navigation

- Background: `gray.0` or `gray.50`
- Width: expanded (~240px), collapsed (icon-only ~56px)
- Active item: `primary.50` background, `primary.500` text, weight 600
- Inactive item: `gray.600` text, weight 400
- Hover: `gray.100` background
- Section dividers: `1px solid gray.150`

### DataTable

- Header: `gray.50` background, 12px weight 600 uppercase `gray.500` text
- Row: `gray.0` background, 14px weight 400 `gray.800` text
- Alternate row: `gray.25` background
- Row hover: `gray.50` background
- Selected row: `primary.50` background
- Border: `1px solid gray.150` between rows
- Sorting indicators, filters, pagination built-in

### Avatar

- Shapes: `circular` (50% radius), `rounded` (8px radius)
- Sizes: `sm` (24px), `regular` (32px), `md` (40px), `lg` (48px), `xl` (56px)
- Status indicators: online (green dot), offline (gray dot), away (yellow), busy (red)
- Fallback: initials on `primary.100` background with `primary.700` text

### Progress Bar

- Types: `linear` (horizontal bar), `circular` (ring)
- Appearance: `solid` (filled), `segmented` (divided)
- Sizes: `sm` (4px track), `md` (8px track), `lg` (12px track)
- Fill: `primary.500` by default, semantic colors for status
- Track: `gray.100`
- Radius: `full` (pill-shaped track)

### Accordion

- Border: `1px solid gray.200` or borderless
- Chevron position: left or right
- Header: 14px–16px weight 500
- Content padding: `16px`
- Transition: smooth height animation

### Breadcrumb

- Separator: `/` or chevron icon
- Text: 14px weight 400 `gray.500`
- Active/current: 14px weight 500 `gray.950`
- Truncation with `maxItems` overflow indicator

### Stepper

- Orientations: `horizontal`, `vertical`
- Step states: `completed` (green check), `current` (primary ring), `pending` (gray), `disabled` (gray, dimmed), `skipped`
- Connector line: `gray.200` (pending) → `primary.500` (completed)

### Snackbar / Toast

- Variants: `info`, `success`, `warning`, `error`
- Position: any corner or center top/bottom
- Background: `gray.950` (dark toast), or semantic tinted
- Radius: `8px`
- Shadow: `lg`
- Auto-dismiss with configurable duration

## 5. Layout Principles & Guide

### Page-Level Layout Compositions

Blend applications follow a **shell + content** architecture. The most common layout is the **Sidebar Shell** — a full-viewport flex container with a fixed-width navigation rail on the left and a flexible content area on the right.

#### The Sidebar Shell (Primary Layout)

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌─────────────────────────────────────┐ │
│ │          │ │ Topbar (sticky, 48px height)        │ │
│ │          │ ├─────────────────────────────────────┤ │
│ │ Sidebar  │ │                                     │ │
│ │ 270px    │ │  Main Content Area                  │ │
│ │ (expanded)│ │  (flex-grow: 1, overflow-y: auto)  │ │
│ │          │ │                                     │ │
│ │          │ │                                     │ │
│ │          │ │                                     │ │
│ └──────────┘ └─────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
        100vw × 100vh, display: flex
```

- **Root container**: `width: 100%`, `height: 100%`, `display: flex`, `flex-direction: row`
- **Sidebar column**: fixed width, `height: 100%`, `flex-shrink: 0`
- **Main column**: `flex-grow: 1`, `display: flex`, `flex-direction: column`, `height: 100%`, `overflow: hidden`
- **Topbar**: `position: sticky`, `top: 0`, nested inside the main column
- **Scrollable body**: `flex-grow: 1`, `min-height: 0`, `overflow-y: auto` — the classic flex scroll pattern

#### Sidebar Dimensions

| State                        | Desktop (≥1024px)                        | Mobile (<1024px)                           |
| ---------------------------- | ---------------------------------------- | ------------------------------------------ |
| Expanded (no tenant panel)   | **270px**                                | Hidden (uses mobile bottom nav)            |
| Expanded (with tenant panel) | **320px** (52px tenant rail + 268px nav) | Hidden                                     |
| Collapsed (icon-only)        | **52px**                                 | Hidden                                     |
| Collapsed + hover overlay    | **250px** overlay at `left: 52px`        | N/A                                        |
| Mobile bottom nav            | N/A                                      | Full-width, ~56px height + safe area inset |

- **Tenant/left panel strip**: fixed `52px` width, vertical icon rail
- **Directory/nav area**: padding `12px` horizontal, `24px` gap between sections
- **Section dividers**: `1px solid gray.150` between nav groups
- **Collapse transition**: width animates smoothly; hover overlay uses `shadow.lg` to float above content

#### Topbar Dimensions

| Property                   | Value                                                                  |
| -------------------------- | ---------------------------------------------------------------------- |
| Height (min/max)           | **48px**                                                               |
| Position                   | `sticky`, `top: 0` inside the main content column                      |
| z-index                    | **90** (within the sidebar shell wrapper)                              |
| Desktop horizontal padding | `32px`                                                                 |
| Mobile horizontal padding  | `16px`                                                                 |
| Backdrop                   | Optional frosted glass (`backdrop-filter`) from tokens                 |
| Auto-hide                  | Scrolls away after **48px** of downward scroll, reappears on scroll-up |

#### Documentation Site Layout (Three-Column)

For content-heavy pages (docs, settings), a **three-column** variant is used:

```
┌─────────────────────────────────────────────────────────────┐
│ Navbar (sticky, top: 0, z-index: 50, height: 48–100px)     │
├──────────┬─────────────────────────────┬────────────────────┤
│ Doc      │                             │ Table of           │
│ Sidebar  │  Main Content               │ Contents           │
│ 240px    │  (flex: 1, overflow-y: auto) │ 240px              │
│ fixed    │                             │ (sticky, top: 16px)│
│          │                             │                    │
└──────────┴─────────────────────────────┴────────────────────┘
                  height: ~90vh
```

- **Nav**: sticky top, `z-index: 50`, responsive height (48px mobile → up to 100px large desktop)
- **Content row**: `display: flex`, `height: 90vh`, `overflow: hidden`
- **Doc sidebar**: `width: 240px`, `height: 100%`, `overflow-y: auto`, `z-index: 40`, right border `1px solid gray.200`
- **Main column**: `flex: 1`, `overflow-y: auto`, responsive border-radius
- **TOC (right)**: `max-width: 240px`, `width: 100%`, inner content `position: sticky`, `top: 16px`
- **Mobile**: doc sidebar becomes a left drawer (310px wide) triggered by hamburger; TOC is hidden

### Modal & Drawer Layout

#### Modal (Desktop)

- **Overlay**: `position: fixed`, `inset: 0`, background `rgba(5, 5, 6, 0.5)`, `z-index: 99`
- **Dialog**: centered via flex, `max-width: 90vw`, `max-height: 90vh`, padding `16px` from viewport edges
- **Internal padding**: `24px` body, `20px` header/footer
- **Header max-height**: `20vh` with `overflow: auto` for long titles
- **Footer**: `display: flex`, `justify-content: flex-end`, `gap: 12px`

#### Modal (Mobile → Drawer)

- On viewports `< 1024px`, modals automatically convert to **bottom drawers**
- Drawer snaps to content height, max `85%` of viewport height
- Swipe-down to dismiss

#### Drawer Dimensions

| Direction    | Default Width/Height                                       | Offset from edges                       |
| ------------ | ---------------------------------------------------------- | --------------------------------------- |
| Left / Right | **400px** (desktop), **full-width minus offsets** (mobile) | `16px` from top/bottom/opposing side    |
| Bottom       | Content-driven, **max 97%** viewport height                | `16px` from left/right, `74px` from top |
| Top          | Content-driven                                             | `16px` from left/right                  |

- **Overlay z-index**: 99
- **Content z-index**: 100
- **Border radius**: `12px` on the visible edges

### Layout Primitives

Blend provides two low-level layout primitives that are the building blocks for all page structures:

#### `Block`

A flexible `div` wrapper that accepts all box-model props as tokens:

- `display`, `flexDirection`, `alignItems`, `justifyContent`
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
- `padding`, `paddingX`, `paddingY`, `margin`, `gap`
- `position`, `top`, `right`, `bottom`, `left`, `zIndex`
- `overflow`, `overflowX`, `overflowY`
- `background`, `border`, `borderRadius`, `boxShadow`

Used directly in Sidebar, Topbar, Modal, and other structural components.

#### `Group`

A flex container for spacing child elements:

- **Row** (default): horizontal flex, default gap `10px`
- **Column**: vertical flex, default gap `12px`
- **Stacked**: gap `0`, children receive `GroupPosition` (first/middle/last) for connected element patterns (e.g., ButtonGroup, InputGroup)
- Aligns children with `align-items: center` (row) or `stretch` (column)

### Z-Index Layering

| Layer                     | z-index | Elements                                                   |
| ------------------------- | ------- | ---------------------------------------------------------- |
| Base content              | 0       | Page body, cards, tables, inline elements                  |
| Topbar token (raw)        | 10      | Topbar self-stacking within its container                  |
| Doc sidebar               | 40      | Documentation navigation column                            |
| Navbar                    | 50      | Sticky site navigation                                     |
| Topbar (in sidebar shell) | 90      | Elevated by the sidebar wrapper                            |
| Sidebar root              | 99      | Side navigation panel                                      |
| Modal overlay             | 99      | Full-screen backdrop                                       |
| Modal dialog              | 99 + 1  | Dialog surface above its own overlay                       |
| Drawer overlay            | 99      | Drawer backdrop                                            |
| Drawer content            | 100     | Drawer surface above overlay                               |
| Tooltip / Popover         | 1000+   | Floating elements (from `zIndex` tokens: 1000, 1100, 1200) |
| Maximum                   | 9999    | Emergency overrides only                                   |

### Overflow & Scrolling Patterns

- **Main content area**: `overflow-y: auto` with hidden scrollbars (clean chrome)
- **Sidebar directory**: `overflow-y: auto` with hidden scrollbars
- **DataTable**: `overflow-x: auto` with smooth horizontal scrolling and touch momentum; tables wider than **640px** container trigger "narrow mode" with column collapsing
- **Card body slots**: `overflow-y: auto`, `overflow-x: hidden` — vertical scroll for tall content, no horizontal bleed
- **Modal header**: `overflow: auto` when content exceeds `20vh`
- **Dropdown menus**: max-height constrained, `overflow-y: auto` for long lists
- **Tab bars**: `overflow-x: auto` with horizontal scroll for overflowing tabs on mobile

### Spacing System (Base Unit: 4px)

The spacing scale is granular for fintech UI precision:

| Token | Value | Common Usage                           |
| ----- | ----- | -------------------------------------- |
| 0     | 0px   | No spacing                             |
| 1     | 1px   | Hairline borders                       |
| 2     | 2px   | Tight inline gaps                      |
| 4     | 4px   | Icon-to-text gap, compact padding      |
| 6     | 6px   | Small component internal padding       |
| 8     | 8px   | Standard component padding, small gaps |
| 10    | 10px  | Medium internal padding                |
| 12    | 12px  | Standard gap between related elements  |
| 16    | 16px  | Standard section padding, card padding |
| 20    | 20px  | Comfortable padding                    |
| 24    | 24px  | Modal/dialog padding, section gaps     |
| 32    | 32px  | Large section spacing                  |
| 40    | 40px  | Major section breaks                   |
| 48    | 48px  | Page-level vertical rhythm             |
| 64    | 64px  | Hero section spacing                   |
| 80    | 80px  | Large page gaps                        |

### Whitespace Philosophy

- **Data-dense but breathable**: Fintech dashboards pack information tightly, but every element has clear padding and consistent gaps. The `8px` base unit ensures rhythmic alignment.
- **Vertical rhythm via spacing tokens**: Section gaps follow the scale — `16px` between related items, `24px–32px` between sections, `48px–64px` between major page divisions.
- **Horizontal alignment**: Labels, inputs, and values align to a consistent left edge. Tables use fixed or proportional column widths for scanability.
- **No fixed max-width**: Content areas expand to fill available space. Maximum widths are context-dependent (modals: `90vw`, drawers: `400px`, content: viewport minus sidebar).

### Grid & Container Patterns

Blend does not impose a fixed 12-column grid. Instead, layout is **component-driven** using flexbox and CSS grid:

| Pattern               | Implementation                                             | Usage                               |
| --------------------- | ---------------------------------------------------------- | ----------------------------------- |
| **Sidebar + Content** | Flex row, sidebar `flex-shrink: 0`, content `flex-grow: 1` | Primary app shell                   |
| **Card Grid**         | CSS grid or flex-wrap, responsive columns (1→2→3→4)        | Dashboard stat cards, listing pages |
| **Form Layout**       | Vertical stack with `12px–16px` gap, labels above inputs   | Settings, creation flows            |
| **Key-Value Pairs**   | Horizontal (label left, value right) or vertical stack     | Detail views, summary cards         |
| **DataTable**         | Full-width with horizontal scroll overflow                 | Data-heavy pages                    |
| **Split View**        | Two-column flex, optional resizable divider                | Comparison, editor layouts          |

### Common Page Recipes

#### Dashboard Page

```
Sidebar Shell
  └─ Topbar (breadcrumb + actions)
  └─ Content (padding: 24px–32px)
      ├─ Page heading (Heading LG, 24px) + description
      ├─ StatCard grid (3–4 columns, gap: 16px)
      ├─ DataTable (full-width, with filters)
      └─ Pagination footer
```

#### Settings / Form Page

```
Sidebar Shell
  └─ Topbar (breadcrumb + save button)
  └─ Content (padding: 24px–32px, max-width: 720px)
      ├─ Page heading + description
      ├─ Form sections (gap: 32px between sections)
      │   ├─ Section heading (Heading SM, 18px)
      │   └─ Input fields (gap: 16px, labels above)
      └─ Footer actions (sticky bottom or inline)
```

#### Detail / View Page

```
Sidebar Shell
  └─ Topbar (back button + title + actions)
  └─ Content (padding: 24px–32px)
      ├─ Summary card (KeyValuePairs, horizontal layout)
      ├─ Tabs (underline variant)
      └─ Tab content (DataTable or card grid)
```

### Border Radius Scale

| Token | Value  | Usage                                       |
| ----- | ------ | ------------------------------------------- |
| 0     | 0px    | Square elements, no rounding                |
| 2     | 2px    | Subtle rounding on inline code              |
| 4     | 4px    | Tags (squarical), small elements            |
| 6     | 6px    | Checkbox, radio, small badges               |
| 8     | 8px    | Buttons, inputs, alerts, tabs               |
| 10    | 10px   | Medium containers                           |
| 12    | 12px   | Cards, dropdown menus, drawers              |
| 16    | 16px   | Modals, large containers                    |
| 20    | 20px   | Large cards, feature sections               |
| 24    | 24px   | Extra-large containers                      |
| 100   | 100px  | Pill shapes (progress bars, range inputs)   |
| full  | 9999px | Circles — avatars, pill badges, status dots |

## 6. Depth & Elevation

| Level          | Token          | Shadow Value                          | Usage                                      |
| -------------- | -------------- | ------------------------------------- | ------------------------------------------ |
| Level 0 (Flat) | —              | No shadow                             | Page background, inline text, table cells  |
| Level 1 (XS)   | `xs`           | `0px 1px 1px 0px rgba(5,5,6, 0.04)`   | Subtle lift: cards at rest, input borders  |
| Level 2 (SM)   | `sm`           | `0px 2px 3px 0px rgba(5,5,6, 0.05)`   | Light lift: cards, buttons at rest         |
| Level 3 (MD)   | `md`           | `0px 2px 8px 1px rgba(5,5,6, 0.07)`   | Medium lift: hover cards, active dropdowns |
| Level 4 (LG)   | `lg`           | `0px 3px 16px 3px rgba(5,5,6, 0.07)`  | Prominent: dropdown menus, popovers        |
| Level 5 (XL)   | `xl`           | `0px 10px 20px 3px rgba(5,5,6, 0.07)` | High: modals, drawers                      |
| Level 6 (2XL)  | `2xl`          | `0px 12px 24px 4px rgba(5,5,6, 0.07)` | Maximum: modal overlays                    |
| Level 7 (Full) | `full`         | `0px 24px 48px 8px rgba(5,5,6, 0.07)` | Dramatic: splash screens, hero overlays    |
| Focus Primary  | `focusPrimary` | `0px 0px 0px 3px #EFF6FF`             | Blue focus ring on interactive elements    |
| Focus Error    | `focusError`   | `0px 0px 0px 3px #FFC9C9`             | Red focus ring on error-state elements     |

**Shadow Philosophy**: Blend's shadows use a near-black base color (`rgba(5,5,6, …)`) rather than pure black, creating subtle, cool-toned depth that feels digital and precise. Opacity is kept between 0.04 and 0.07 — never heavy. The `focusPrimary` and `focusError` rings use solid-color 3px spread-only shadows (no blur) for crisp, accessible focus indicators that don't shift layout.

## 7. Do's and Don'ts

### Do

- Use `gray.950` (`#0E121B`) for primary text — the near-black provides maximum contrast without harshness
- Apply `primary.500` (`#2B7FFF`) only for primary actions, active states, and interactive accent — it is the singular brand color
- Use `gray.200` (`#E1E4EA`) for default borders on cards, inputs, dividers — it's the workhorse border color
- Apply the foundation token scale consistently — never hardcode hex values; always reference `foundationTokens.colors.*`
- Use `8px` border-radius for buttons and inputs, `12px` for cards and menus, `16px` for modals
- Maintain the 4px spacing grid — all padding, margin, and gap values should be multiples of 4
- Use `shadow.lg` for dropdown menus and popovers, `shadow.xl` or `shadow.2xl` for modals
- Apply `focusPrimary` ring on all focusable interactive elements for accessibility
- Use `gray.50` (`#F5F7FA`) for hover backgrounds on list items, table rows, and menu items
- Use weight 500 for button labels, weight 600 for headings, weight 400 for body text
- Apply semantic colors (red/green/yellow/orange) only for their intended states (error/success/warning/attention)
- Wrap all components in `ThemeProvider` for consistent token access

### Don't

- Don't use pure black (`#000000`) for text — always use `gray.950` or `gray.900`
- Don't use `primary.500` for backgrounds or large surfaces — it's an accent, not a surface color
- Don't apply shadows heavier than `0.07` opacity — Blend's elevation is restrained and precise
- Don't mix border-radius values — pick from the scale (0, 4, 6, 8, 10, 12, 16, 20, full)
- Don't use weight 700 (bold) for UI text smaller than 32px — reserve it for display sizes
- Don't introduce new colors outside the seven semantic palettes (gray, primary, purple, orange, red, green, yellow)
- Don't apply custom focus styles — always use `focusPrimary` or `focusError` shadow rings
- Don't use Inter's italic axis — the system is upright-only for clarity in data-dense contexts
- Don't hardcode pixel values for spacing — use the `unit` token scale
- Don't add decorative gradients, text shadows, or background patterns — Blend is data-forward, not decorative
- Don't use `gray.400` for body text — it's only for placeholders and disabled states. Body text minimum is `gray.500`
- Don't skip the `ThemeProvider` — components depend on token context for correct rendering

## 8. Responsive Behavior

### Breakpoints

| Name            | Width        | Token Key | Key Changes                                                                          |
| --------------- | ------------ | --------- | ------------------------------------------------------------------------------------ |
| Small (Mobile)  | 320px–1023px | `sm`      | Single column layouts, stacked navigation, drawer overlays, compact component sizing |
| Large (Desktop) | ≥1024px      | `lg`      | Multi-column layouts, sidebar navigation, expanded data tables, full-size components |

_Note: Blend uses a binary breakpoint system (mobile ↔ desktop) rather than a granular multi-breakpoint approach. This reflects its primary use case: payment dashboards that are either desktop-optimized or mobile-adapted._

### Storybook Preview Viewports

| Device  | Width × Height |
| ------- | -------------- |
| Mobile  | 375 × 667      |
| Tablet  | 768 × 1024     |
| Desktop | 1200 × 800     |

### Touch Targets

- Minimum touch target: 32px × 32px (sm size components)
- Recommended touch target: 36px–40px (md/lg size components)
- Buttons, inputs, and selectors all have height tokens aligned to these targets
- Interactive list items have minimum 36px row height

### Collapsing Strategy

- **Sidebar**: full sidebar → collapsed icon-only → hidden (mobile menu/drawer)
- **DataTable**: horizontal scroll on mobile, optional column hiding
- **Modals**: centered dialog → full-screen drawer on mobile
- **Tabs**: horizontal scroll on mobile if tabs overflow
- **Card grids**: 4 col → 3 col → 2 col → 1 col (stacked)
- **Select menus**: dropdown → full-screen drawer on mobile
- **Navigation**: topbar + sidebar → hamburger menu + drawer

### Component Size Adaptation

Components use responsive token maps (`sm` / `lg`) to adjust:

- Font sizes scale down 1–2px on mobile
- Padding reduces by one step (e.g., 16px → 12px)
- Border radius may tighten (e.g., 12px → 8px)
- Shadows may simplify (e.g., `lg` → `md`)

## 9. Agent Prompt Guide

### Quick Token Reference

- **Background**: White (`#FFFFFF`)
- **Surface alt**: Cool gray (`#F5F7FA`)
- **Text primary**: Near-black (`#0E121B`)
- **Text secondary**: Medium gray (`#717784`)
- **Text tertiary**: Dark gray (`#525866`)
- **Text disabled / placeholder**: Light gray (`#99A0AE`)
- **Brand accent**: Primary Blue (`#2B7FFF`)
- **Brand hover**: Deep Blue (`#0561E2`)
- **Default border**: Soft gray (`#E1E4EA`)
- **Hover surface**: Light gray (`#F2F4F8`)
- **Error**: Red (`#FB2C36`)
- **Success**: Green (`#00C951`)
- **Warning**: Yellow (`#EFB100`)
- **Card shadow**: `0px 2px 3px 0px rgba(5,5,6, 0.05)`
- **Dropdown shadow**: `0px 3px 16px 3px rgba(5,5,6, 0.07)`
- **Focus ring**: `0px 0px 0px 3px #EFF6FF`
- **Font family**: `InterDisplay`
- **Code font**: `SF Mono`

### Example Component Prompts

- **"Create a primary button"**: `#2B7FFF` background, `#FFFFFF` text, `8px` radius, 14px InterDisplay weight 500, height 36px (md). Hover: `#0561E2`. Focus: `0px 0px 0px 3px #EFF6FF` ring. Disabled: `#BEDBFF` bg, reduced opacity.

- **"Design a text input"**: White background, `1px solid #E1E4EA` border, `8px` radius, 14px InterDisplay weight 400 text in `#0E121B`, placeholder in `#99A0AE`. Label above: 12px weight 500 `#2B303B`. Focus: border `#2B7FFF` + `0px 0px 0px 3px #EFF6FF`. Error: border `#FB2C36` + helper text in red below.

- **"Build a data card"**: White background, `1px solid #E1E4EA` border, `12px` radius, `0px 2px 3px 0px rgba(5,5,6, 0.05)` shadow, `16px` padding. Title: 16px weight 600 `#0E121B`. Description: 14px weight 400 `#717784`. Hover: shadow transitions to `0px 2px 8px 1px rgba(5,5,6, 0.07)`.

- **"Create a dropdown menu"**: White surface, `12px` radius, `0px 3px 16px 3px rgba(5,5,6, 0.07)` shadow, `1px solid #E1E4EA` border. Items: 14px InterDisplay weight 400, `8px 12px` padding. Hover: `#F5F7FA` background. Selected: `#EFF6FF` background, `#2B7FFF` text.

- **"Design an alert banner (error)"**: `#FEF2F2` background, `1px solid #FFC9C9` border, `8px` radius. Icon: red error icon. Title: 14px weight 600 `#FB2C36`. Description: 14px weight 400 `#82181A`. Close button top-right.

- **"Build a sidebar navigation"**: `#FFFFFF` background, `1px solid #ECEFF3` right border. Width: 240px expanded, 56px collapsed. Items: 14px weight 400 `#525866`, `8px 12px` padding, `6px` radius. Active item: `#EFF6FF` background, `#2B7FFF` text, weight 600. Hover: `#F2F4F8` background. Section labels: 12px weight 600 `#99A0AE` uppercase.

- **"Create a tag / badge"**: Pill shape (`9999px` radius), `#EFF6FF` background, `#2B7FFF` text, 12px weight 500, `4px 8px` padding (sm size). For error: `#FEF2F2` bg, `#FB2C36` text. For success: `#F0FDF4` bg, `#00A63E` text.

- **"Design a modal dialog"**: `rgba(5,5,6, 0.5)` overlay. White surface, `16px` radius, `0px 12px 24px 4px rgba(5,5,6, 0.07)` shadow, `24px` padding. Title: 20px weight 600 `#0E121B`. Close: icon button top-right. Footer: right-aligned buttons with `12px` gap — secondary (white/bordered) left, primary (`#2B7FFF`) right.

- **"Build a data table"**: Header: `#F5F7FA` bg, 12px weight 600 uppercase `#717784`. Rows: white bg, 14px weight 400 `#222530`, `1px solid #ECEFF3` border-bottom. Alternate rows: `#FCFCFD`. Hover: `#F5F7FA`. Selected: `#EFF6FF`. Pagination below with secondary buttons.

### Iteration Guide

1. Start with white surfaces and `gray.950` text — the neutral canvas is the foundation
2. Apply `primary.500` (`#2B7FFF`) sparingly — only CTAs, active states, and links
3. Use `gray.200` (`#E1E4EA`) for all default borders — it's the universal divider
4. Shadows are subtle: `sm` for cards at rest, `lg` for overlays, `focusPrimary` for focus
5. Inputs, buttons, and alerts all share `8px` radius — consistency is key
6. Cards and menus use `12px` radius — one step up from interactive elements
7. Modals use `16px` radius — the roundest standard container
8. Text hierarchy: 400 body → 500 interactive → 600 headings → 700 display only
9. Semantic colors (red, green, yellow, orange, purple) are for status, not decoration
10. When in doubt, reference `FOUNDATION_THEME` tokens — they are the single source of truth
