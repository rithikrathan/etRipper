# DWIN UI Design Rules

These rules govern how UIs are designed for DWIN embedded displays. The etRipper pipeline screenshots HTML/CSS and exports flat PNGs — the display has no browser engine, no CSS runtime. Every pixel is baked in.

---

## 1. Viewport & Layout

**1.1** The display has a fixed resolution (e.g. 480×800). The `.device-screen` container enforces it with hard `width`/`height` — no responsive layout, no `max-width`, no percentage-based sizing on the root.

**1.2** All content must fit in one screen. There is no scroll. If content overflows, it is clipped silently. Calculate total content height and verify it does not exceed the viewport height.

**1.3** The page model is discrete — each screen is an independent page (numbered 00, 01, 02…). Navigation is page-switching, not scrolling. Design each page as a self-contained layout.

**1.4** Use a fixed grid (e.g. 2 columns, 4 rows for controls). Do not rely on `flex-wrap` or `auto-fill` to rearrange elements — the layout must be deterministic and pixel-perfect.

---

## 2. Padding, Margin & Spacing

**2.1** The canvas/parent container must apply internal padding to create a safety buffer from the display bezel. Minimum 18px horizontal, 18px vertical. On smaller screens (< 480px wide), minimum 12px.

**2.2** All interactive elements must maintain at least 8px gap between each other. This prevents accidental adjacent touches.

**2.3** Card internal padding: minimum 12px horizontal, 10px vertical. Content inside cards (icon, label, toggle) must not touch the card border.

**2.4** Consistent spacing rhythm: use a single spacing unit (e.g. 4px or 8px). All gaps, paddings, and margins should be multiples of that unit. For a 480×800 screen, 4px base is recommended.

**2.5** The total consumed height must be calculated precisely:

```
top_padding + header_height + gap + widget_height + gap + label_height + gap + grid_height + bottom_padding = viewport_height
```

If this sum exceeds the viewport height, content is clipped. If it is less, there is dead space. Neither is acceptable.

**2.6** Safe zone: keep all interactive content at least 10px from the screen edges. This accounts for display bezel occlusion and touch calibration drift at edges.

---

## 3. Interactivity

**3.1** DWIN supports touch press/release feedback — when a finger is down on a touch region, the display can show a pressed state. However, CSS `:hover` (cursor hover without touch) does not apply to touchscreens. Design for two touch states:

- **Released (default)** — the element at rest
- **Pressed (finger down)** — visual feedback that the touch is registered (color shift, icon scale, brightness change)

DWIN's touch controls handle press/release automatically when configured with a press image variant.

**3.2** For the etRipper pipeline: the ripper captures steady-state images (OFF, ON, etc.), not the transient press state. The press/release feedback is configured in the DWIN DGUS project separately by assigning a press icon to the touch control. Design the press variant visually but it does not need to appear in the rip config.

**3.3** Minimum touch target size: 40×40px. Preferably 48×48px for comfortable use.

**3.4** Toggle controls must have two distinct visual states (ON/OFF) that are exported as separate images. The display swaps the image based on the variable value.

**3.5** Button press feedback: at minimum, invert a color or swap an icon. This is handled by DWIN's touch control config (assign a separate press image), not by CSS `:active`.

---

## 4. Image & Assets

**4.1** Every unique visual variant of an element is a separate exported PNG. Plan for this — a toggle switch needs OFF.png and ON.png. A multi-state button needs N images.

**4.2** Reuse backgrounds across pages. A shared background image costs 1 slot in flash. Duplicating it per page costs N slots.

**4.3** File naming: pages are `00_*.png`, `01_*.png`, etc. Icon sources go in `Icon_Sources/` with zero-padded numeric prefixes.

**4.4** Export resolution must exactly match the display resolution. No retina/high-DPI exports — `device_scale_factor=1` in Playwright.

**4.5** Prefer flat design — avoid gradients, shadows, and semi-transparency. These increase PNG file size and may band in 16-bit (65K color) mode.

---

## 5. Text & Typography

**5.1** Static labels (headers, section titles, button labels) should be pre-rendered into the background image. They will never change.

**5.2** Dynamic text (temperature values, sensor readings, status messages) must use DWIN's variable text system. In the HTML design, render them as live elements with unique IDs — the ripper captures the background, but the dynamic slot is managed by the display's runtime.

**5.3** Minimum font size for readability: 14px. For critical data (temperature, status): 20px+.

**5.4** Use high-contrast text colors. DWIN displays are often viewed in bright industrial environments with glare. Light text on dark backgrounds (Rosé Pine: `#e0def4` on `#191724`) is preferred.

---

## 6. Color

**6.1** DWIN displays are 16-bit (65K colors). Test gradients — they may show visible banding.

**6.2** Minimum contrast ratio for text: 4.5:1 (WCAG AA). For state indicators (LEDs, active/inactive): at least 3:1.

**6.3** Use a consistent color palette across all pages. Rosé Pine is the default theme:

| Role | Color | Hex |
|---|---|---|
| Background | Deep purple | `#191724` |
| Surface | Muted purple | `#1f1d2e` |
| Text | Soft white | `#e0def4` |
| Subdued | Muted gray | `#908caa` |
| Accent/Active | Rose | `#eb6f92` |
| Warning/Heat | Gold | `#f6c177` |
| Info/Cool | Sky | `#9ccfd8` |
| Special | Iris | `#c4a7e7` |

---

## 7. Page Architecture

**7.1** Pages are numbered sequentially: `00`, `01`, `02`… No gaps. The display loads pages in order.

**7.2** Page `00` is the boot/default screen. It must be fully self-contained — no dependencies on variables initialized by other pages.

**7.3** Each page gets its own background image. Shared elements (header bar, navigation dots) must be present in every page's background or overlaid as icon layers.

**7.4** Guide mode (magenta hitboxes) and base mode (hidden dynamic elements) are generated automatically from the same HTML. Ensure all interactive elements have unique IDs so the guide overlay is correct.

---

## 8. Checklist (Before Finalizing)

- [ ] All content fits inside the viewport without overflow
- [ ] Total height = top_pad + header + gap + body + gap + bottom_pad == viewport height
- [ ] Touch targets are ≥ 40×40px
- [ ] No `:hover`-dependent styles (cursor hover doesn't exist on touchscreens; press states are fine)
- [ ] Every toggleable element has distinct OFF/ON visual states
- [ ] Interactive elements are inside the safe zone (≥ 10px from edges)
- [ ] Consistent spacing (base unit rhythm)
- [ ] High contrast on all text
- [ ] No gradients without checking 16-bit banding
- [ ] Page numbering matches the display's expected order
- [ ] Shared elements reused across pages, not duplicated
- [ ] Each element with dynamic content has a unique `id` for ripper targeting
- [ ] `rip-config.yaml` covers all elements with correct selectors, states, and setup scripts
