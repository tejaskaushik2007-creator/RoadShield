---
name: Tactical Geospatial Command
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#171c25'
  surface-container: '#1b2029'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2f0'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2c303b'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#fff3f3'
  on-tertiary: '#670020'
  tertiary-container: '#ffcdd1'
  on-tertiary-container: '#be0042'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2ba'
  on-tertiary-fixed: '#400011'
  on-tertiary-fixed-variant: '#910030'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#31353f'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  telemetry-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.02em
  telemetry-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  telemetry-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for mission-critical civic infrastructure monitoring, incident dispatch, and real-time geospatial telemetry. It merges brutalist technical utility with high-density data console ergonomics.

The visual tone is uncompromising, analytical, and authoritative. It strips away ornamental flourishes in favor of hyper-legible telemetry, immediate optical status recognition, and relentless spatial precision. The experience simulates an elite tactical situational display: high contrast against void-level blacks, focused chromatic energy reserved strictly for actionable states, and strict structural discipline designed to mitigate cognitive overload under high-stress conditions.

## Colors

The chromatic architecture operates on an emission hierarchy: deep, absorbing tactical darks form the base, while high-frequency neon accents communicate state and telemetry.

- **Background (`#070b14`):** Canvas ground level representing deep baseline situational space.
- **Surface (`#0b1325`):** Standard panel layer for operational boards, card groups, and map overlay widgets.
- **Surface Variant (`#0f1c34`):** Raised telemetry layers, popovers, active dock panels, and contextual headers.
- **Primary / Electric Cyan (`#00f0ff`):** Vectors of active operation, radar sweeps, focus vectors, active selection, and optimal telemetry status.
- **Primary Dim (`#06b6d4`):** Subordinate system highlights, secondary data traces, and passive telemetry readouts.
- **Critical / Neon Crimson (`#ff3366`):** Breaches, severe network drops, perimeter failures, and critical road incidents. Must pierce through busy map clusters.
- **Warning / Hazard Amber (`#fb923c`):** Lane obstructions, advisory telemetry, threshold cautions, and weather alerts.
- **Success / Emerald (`#10b981`):** Verified clearance, active transponders, nominal node operations.
- **Hairline Outline (`#14223b`):** 1px structural framing separating visual blocks without raising visual weight.
- **Text Layers:** Primary (`#f8fafc`) for immediate clarity, Secondary (`#94a3b8`) for descriptions and field keys, and Muted (`#64748b`) for inert coordinates and static metadata.

## Typography

The typographic system separates human-language narrative from hard machine data.

- **Primary Matrix (Inter):** Deployed across all UI chrome, navigational taxonomy, incident logs, and structural titles. It provides reliable, high-legibility sans-serif tracking at dense scales without visual degradation.
- **Telemetry & Metric Matrix (JetBrains Mono):** Dedicated to all alphanumeric readouts, incident timestamps, GPS coordinates, sensor payloads, network latency markers, and tabular data. The tabular, uniform-width characters prevent layout shifting when values stream in real-time.
- **Casing & Optical Weights:** Metadata keys and section badges prioritize all-caps mono labels (`label-caps`) to invoke technical instrument panels. Body copy maintains natural sentence-case syntax for rapid scanning under time-critical triage.

## Layout & Spacing

A compact, technical modular layout designed for full-viewport spatial dashboards, split-pane operations, and floating radar heads-up displays (HUDs).

- **Grid Discipline:** A fluid 12-column matrix engineered for high-density information displays. On widescreen command consoles (`>= 1440px`), the canvas locks into a multi-dock arrangement: persistent left navigational rail (64px), variable secondary panel (320px–380px), central map/telemetry canvas, and dynamic right situational drawer (360px).
- **Responsive Adaptations:**
  - **Desktop (`>= 1024px`):** Persistent overlays, multi-tier split layouts, dynamic 16px (`1rem`) gutters.
  - **Tablet (`768px - 1023px`):** Collapsible lateral panels converting to floating drawers; 12px (`0.75rem`) gutters.
  - **Mobile (`< 768px`):** Single-column stacked triage view. The central map becomes full-bleed background canvas with a swipeable, bottom-anchored tactical sheet. Margins compress to 16px (`1rem`).
- **Internal Density:** Components leverage tight spacing increments (`0.25rem` to `0.75rem`) to maximize visible information density per square inch without causing element collision.

## Elevation & Depth

Depth is established strictly through **tonal stratification** and **hairline tactical containment**, avoiding muddy drop shadows that reduce legibility on dark displays.

- **Base Canvas (`#070b14`):** Foundational zero-layer housing raw geospatial vector maps, satellite imagery, and static backdrops.
- **Tier 1 - Command Containers (`#0b1325`):** Standard operational pods, telemetry modules, and listing tables. Outlined with a continuous 1px hairline border of `#14223b`.
- **Tier 2 - Floating HUD Panels (`#0f1c34`):** Active tooltips, flyout dispatch widgets, filter trays, and modal dialogs. Features a reinforced dual-edge effect: a 1px border (`#1e293b`) coupled with an ultra-subtle, directional 12px ambient rim glow tinted in primary cyan (`rgba(0, 240, 255, 0.04)`).
- **Active State Illumination:** Selected elements or elevated critical alerts reject drop shadows; instead, they generate a 1px inner or perimeter neon laser highlight (`#00f0ff` or `#ff3366`) with a 0 0 10px chromatic dissipation aura (`rgba(0, 240, 255, 0.2)`).

## Shapes

The geometric framework is grounded in calibrated industrial precision. 

Corners utilize subtle, controlled rounding (4px baseline, up to 8px on master structural frames) to soften optical harshness while preserving the angular, functional integrity of hardware avionics. Circular pills are strictly forbidden except for live status beacons and pulsing coordinate nodes. Micro-indicators, button controls, input surfaces, and data tags strictly honor the 4px curvature limit (`0.25rem`), retaining a crisp, machined profile.

## Components

### Buttons & Tactical Triggers
- **Primary Action:** Solid Electric Cyan (`#00f0ff`) fill with deep contrast `#070b14` typography. Bold weight, uppercase mono tracking. Active state features a 1px exterior ring and `#06b6d4` compression.
- **Secondary / Panel Action:** Dark slate Navy surface (`#0f1c34`) with a 1px hairline border (`#14223b`) and `#f8fafc` text. Hover shifts border color to `#00f0ff`.
- **Critical / Emergency Override:** Neon Crimson (`#ff3366`) solid or perimeter-traced with red chromatic glow (`rgba(255, 51, 102, 0.2)`). Reserved for dispatch cancellations, lockout controls, and hazardous incident escalation.

### Telemetry Badges & Chips
- Compact, monospaced inline tags (`JetBrains Mono`, 10px-11px).
- Translucent backdrop fills (`rgba(x, y, z, 0.12)`) paired with high-saturation 1px containment borders matched to status color (Cyan for nominal, Orange for hazard, Crimson for critical).
- Left-aligned 6px status point that pulses during live data streaming.

### Data Tables & Incident Lists
- High-density rows (32px to 40px height) utilizing zebra-alternative hairline bottom separators (`#14223b`).
- Primary identifiers and timestamps in `JetBrains Mono` to guarantee column symmetry.
- Hover states illuminate the entire row using an overlay tint of `#0f1c34` with an active 2px left border marker in Electric Cyan.

### Selection Controls (Checkboxes & Radios)
- Crisp 4px squared bounds (`#0b1325`) with a 1px outline (`#64748b`).
- Checked state fills with `#00f0ff` using deep navy checkmark or radio dot glyphs.
- Focused state applies a sharp cyan glow ring (`0 0 0 2px rgba(0, 240, 255, 0.25)`).

### Input Fields & Telemetry Filters
- Recessed background styling (`#070b14`) bound by `#14223b` hairline borders.
- Text renders in high-contrast `#f8fafc` with secondary key indicators displayed in JetBrains Mono.
- Active focus immediately transitions the border to `#00f0ff` with an ultra-thin inset stroke.

### Tactical HUD Cards & Overlays
- Structured dark panels (`#0b1325`) wrapped in a 1px border (`#14223b`).
- Card headers feature an integrated technical bar: uppercase mono categorization, coordinate coordinates, and contextual node status indicators.
- Content sections are cleanly partitioned by horizontal 1px hairline rules without padding bloat.

### Domain-Specific Components
- **Geospatial Coordinate Strip:** Monospaced HUD ribbon permanently fixed or docked to viewport corners, displaying dynamic crosshair lat/long, zoom levels, and sensor sweep ping rates.
- **Incident Escalation Stepper:** Compact, segmented pipeline bar featuring sharp vector steps showing triage progress (Identified > Dispatched > En Route > Resolved).