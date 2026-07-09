# Project Context

## Repository
- **Root:** `/mnt/sda4/InternshitWorks/etRipper/`
- **Session script:** `/mnt/sda4/InternshitWorks/etRipper/session.sh`

## Documentation (Notes)
- **Location:** `/mnt/sda4/projects/notes/internshipHomeAutomation/`
- This folder is the **primary reference** for the target architecture and API design.
- If there is a conflict between code and notes, **notes take priority** — the notes document the intended final product.

## Role

Assume the user is experienced — answer concisely, just what was asked. No greetings, no verbose preamble.

Your job is to **help the user code, not code for them**. The user drives architecture and decisions; you handle the grunt work, research, and catch mistakes.

**Push back when needed.** If the user is doing something naive, inefficient, or wrong, say so. Don't be a yes-man. Explain why and suggest alternatives. Constructive feedback is expected.

## Scope

- **Read:** Any file in the project is fair game for reading to gather context.
- **Write:** Code under this repository and documentation under the notes folder.
- Never edit `.git/` contents or auto-generated files unless explicitly asked.
- **Scope override:** When the user says **"scope"** followed by a list of directories/files, discard everything outside those paths. No reads, no writes, no references to anything not in the explicit scope list. This overrides all other scope rules.

## First Prompt Reads

On every new session or when responding to the first request/prompt, immediately read these:

- `/mnt/sda4/InternshitWorks/etRipper/` — project root
- `/mnt/sda4/projects/notes/internshipHomeAutomation/` — documentation notes
- `/mnt/sda4/projects/notes/internshipHomeAutomation/etRipper.md` — this project's doc
- `/tmp/opencode/` — temporary workspace

## How to Document

### Documentation Style
- Obsidian-compatible markdown
- Use `[[wiki-links]]` for cross-references between files
- Blank lines before tables (Obsidian requirement)
- SVGs in `assets/`, embedded via `<img src="assets/..." width="100%"/>`
- Keep it concise — no preamble or explanations beyond what's needed

### Documentation Rules
- **ALWAYS ask the user** before deciding on documentation structure, format, or what to document
- **ALWAYS ask the user** before committing, pushing, or any version control operations
- The notes folder is the documentation source of truth — update it, not inline code comments
- When creating new doc files, follow the existing style (wiki-links, blank lines before tables, etc.)
- Don't add README.md or other meta-documentation unless explicitly asked

## Shared Code Style
- **Comment sparingly** — no verbose inline explanations. The code should speak for itself.
- **Debug prints** — mark with `// [debug]` on the same line. Never strip debug prints; comment them out instead, preserving the tag.

## Shared Workflow
- **Concurrent tool calls** — batch independent reads/searches in one message. Speeds up every session.
- **Read before edit** — always read a file before making changes to it.
- **Follow existing conventions** — check neighboring files for patterns, libraries, and style before writing anything new.
- **Prefer small diffs** — surgical edits over full rewrites unless the whole file needs rework.
- **Batch similar edits** — if the same logic change applies across multiple files, do them all in one message.
- **Escalate unknowns** — if unsure about something (which tool to use, which pattern fits, where something lives), ask the user. Don't guess.

## Git
- Only commit, push, or create PRs when explicitly asked.
- **Pre-commit ritual:**
  1. If you made changes, ask: "docs need updating?"
  2. Update relevant docs if user confirms
  3. Run `git diff --cached` and review every line
  4. Verify from the user that the change actually works
- **Commit format:**
  ```
  <type>: <imperative present tense, lowercase, no period>

  <body — explains what and why, not how. Wrap at 72 chars.
   Bullet points for multiple changes.>
  ```
- **`[llm]` flag:** prepend `[llm]` to the subject for AI-generated commits
  - `[llm] add: STATE_CHANGED event handler` — AI wrote the code, user reviewed
  - `fix: state machine not transitioning on landing` — no flag = user-authored
  - When user says **"dont use [llm] flag"**, it means they gave complete instructions
    and the AI's role was only typing — treat as user commit, no flag.
- **Types:** `add`, `fix`, `change`, `refactor`, `cleanup`, `docs`

---

## Context: Tool Development

Activate this context when working on the etRipper framework itself (React/TS components, Python ripper, config system, Makefile, or build tooling).

### Project Architecture
- **Frontend:** React 19 + TypeScript + Vite. Entry at `src/main.tsx`. Root component `src/App.tsx` renders a `Canvas` wrapper with screen components as children.
- **Ripper:** Python 3 + Playwright. Entry at `ripper/rip.py`. Config-driven — reads `rip-config.yaml` and executes captures (selector → filepath + optional mode/setup JS).
- **Config:** `rip-config.yaml` at project root. Shared contract between the UI and the ripper.
- **Output:** Generated PNGs go to `DWIN_SET/`.

### Component Guidelines (React/TS)
- Components live in `src/components/`, one file per component.
- Props are typed with `type Props = {...}` exported from the component file.
- Use plain CSS in `src/styles/global.css` — no CSS modules, no styled-components.
- Each component is a named function export, default-exported.
- The `Canvas` component is the resolution-locked viewport wrapper. Screen content is passed as `children`.

### Python Guidelines (Ripper)
- Standard library + `playwright` + `pyyaml`.
- `capturer.py` exports `screenshot(page, selector, filepath)` — determines format from file extension (`.png` → save raw bytes with alpha, `.bmp` → Pillow convert RGB).
- `rip.py` is the CLI entry point. Never hardcode selectors or output paths — everything comes from config.
- Run with `./venv/bin/python3 ripper/rip.py <url> --config <path>`.

### Rip Config — Asset Types & Capture Rules

The ripper produces two kinds of assets. They must not be confused.

**1. Page backgrounds** — full 480×800 captures of a page with dynamic elements hidden (base mode) or touch hitboxes visible (guide mode). These form the static canvas that DWIN displays behind all overlays.

```
selector: "#main-screen"    # the Canvas viewport wrapper
output:   "NN_<Name>.bmp"   # BMP, no alpha, full viewport
mode:     "base"/"guide"    # base → clean BG, guide → magenta hitboxes
page:     "NN"              # page ID for auto-switch
```

**2. Element captures** — isolated, reusable widget sub-elements with transparent backgrounds. These are overlays that DWIN places on top of the page background at known coordinates. They must NOT include any static layout (labels, backgrounds, borders, static icons) — that belongs in the page background.

```
selector: ".slider, .led, .checkbox-box, .radio-dot, .slider-thumb"   # the reusable sub-element
output:   "Icon_Sources/<Name>_<STATE>.png"                            # PNG with transparency
```

**Critical rules for element captures:**

| Do NOT capture | Because |
|---|---|
| Whole cards/rows/wrappers (`#ctrl-1`, `.device-row`, `.checkbox-row`) | They include container backgrounds, borders, labels — static layout baked into the page background |
| Labels, device names, section headers | Static text belongs in the page background BMP |
| Numeric values, dynamic temperatures | DWIN writes its own variable values |
| Static icons (lightbulb, fan, fire icons) | Part of the card's static appearance, already in page background |
| Progress bars at a specific fill % | DWIN controls fill width — capture just the empty track and fill bar |

| Do capture | As | States |
|---|---|---|
| Toggle slider (the track + knob) | transparent PNG | slider OFF, slider ON |
| LED dot | transparent PNG | LED dim, LED glowing |
| Checkbox box | transparent PNG | unchecked, checked |
| Radio dot | transparent PNG | unselected, selected |
| Slider empty track | transparent PNG | always same |
| Slider filled portion | transparent PNG | full-width (DWIN clips/stretches) |
| Slider thumb | transparent PNG | always same |
| Push button region | transparent PNG | released, pressed |
| Status badge | transparent PNG | connected badge, disconnected badge |
| Device status indicator | transparent PNG | online, offline |

**State ordering:** capture OFF/neutral first, then ON/pressed/toggled. Each element resets to its normal mode after capture. Use `setup` JS to toggle the state for subsequent captures.

**`page:` field** — every capture should specify which page to show. Ripper tracks the current page and calls `window.setPage(n)` only when switching.

**Default order:** page backgrounds first (base, then guide — each resets mode after capture), then element captures grouped by page.

### Makefile Targets
```
make dev          — start Vite dev server
make build        — production build
make install      — npm + pip deps
make install-browser — also download Playwright Chromium
make rip          — start server, rip assets, stop server
```

### Verification
- TypeScript: `npx tsc --noEmit`
- Build: `npx vite build`
- Python config loading: `./venv/bin/python3 -c "import sys; sys.path.insert(0,'ripper'); from rip import load_config; cfg=load_config('rip-config.yaml')"`

---

## Context: UI Design

Activate this context when designing or modifying DWIN display screens — the visual layout, components, styles, and capture configuration.

### Primary Reference
Read **`RULES.md`** first. It defines all DWIN display constraints: viewport sizing, spacing/padding rules, touch targets, image state requirements, color palette, and page architecture.

### Screen Architecture
- Everything renders inside `Canvas` at the configured resolution (default 480×800).
- The screen is composed of components in `src/components/`. Available primitives:
  - `Header` — title bar + connection badge (id: `#ui-header`, `#conn-status`)
  - `TempDisplay` — climate widget (id: `#widget-temp`)
  - `ControlCard` — toggle card with icon, slider, LED, label (id: `#ctrl-{n}`)
  - `ControlsGrid` — 2×N grid of `ControlCard` instances
  - `Canvas` — resolution-locked wrapper, accepts children
- All screens share `src/styles/global.css` (Rosé Pine theme via plain CSS).
- App reads URL param `?mode=base` or `?mode=guide` to toggle DGUS export modes.

### When Adding a New Screen/Page
1. Create components in `src/components/` following existing patterns.
2. Add styles to `src/styles/global.css`.
3. Wire the layout into `src/App.tsx` inside `<Canvas>`.
4. Add entries to `rip-config.yaml`:
   ```yaml
   # Page background (always first, with page)
   - selector: "#main-screen"
     output: "00.bmp"
     mode: base
     page: "00"

   # Guide overlay (always second, with page)
   - selector: "#main-screen"
     output: "00_Guide_Hitboxes.bmp"
     mode: guide
     page: "00"

   # Static element (page switch handled by auto-track)
   - selector: "#widget-temp"
     output: "Icon_Sources/002_Temp_Widget.bmp"
     page: "00"

   # Toggle: OFF then ON
   - selector: "#ctrl-1"
     output: "Icon_Sources/010_Light_1_OFF.bmp"
     page: "00"
   - selector: "#ctrl-1"
     output: "Icon_Sources/011_Light_1_ON.bmp"
     page: "00"
     setup: "document.querySelector('#ctrl-1 input').click()"
   ```
5. Test with `npm run dev`, then rip with `make rip`.

### Capture Config Reference
Each `rip-config.yaml` capture entry supports:
| Field | Required | Description |
|---|---|---|
| `selector` | yes | CSS selector targeting the element |
| `output` | yes | Relative path in `DWIN_SET/` |
| `page` | no | Page ID (`"00"`, `"01"`...) — ripper calls `window.setPage(n)` before capture |
| `mode` | no | `"base"` or `"guide"` — applies DGUS mode before capture |
| `setup` | no | JS to execute before capture (e.g. toggle state) |

### Rip Config Rules
- **Page backgrounds** → `NN_{Name}.bmp` (24-bit BMP, no alpha), `mode: base`, `page: "NN"`. Selector `#main-screen` (full viewport).
- **Guide overlay** → `NN_Guide_Hitboxes.bmp` (BMP for DGUS touch config), `mode: guide`, `page: "NN"`. Same page-number prefix.
- **Element captures** → `Icon_Sources/{NNN}_{Name}_{STATE}.png` (transparent PNG). Only the reusable sub-element — never the wrapper card/row.
- **`page:` field** — every entry should specify its page. The ripper tracks the current page and auto-switches.
- **Order:** page backgrounds first (base, then guide — each resets mode after itself), then element captures grouped by page. Toggle ON after OFF so the page resets to its default state.

### Element Capture Rules (Critical)
| Do NOT capture | Reason |
|---|---|
| Full cards, rows, wrappers | Include container backgrounds, borders, labels — static layout goes in page background |
| Labels, section headers, device names | Static text belongs in page background BMP |
| Numeric values, dynamic readouts | DWIN writes its own variable values |
| Static icons (lightbulb, fan, etc.) | Part of card's static appearance, already in page background |
| Progress bars at specific fill % | DWIN controls fill width — capture just empty track and fill bar |

| Do capture (sub-element) | As | States |
|---|---|---|
| Toggle slider track+knob | transparent PNG | OFF, ON |
| LED indicator dot | transparent PNG | dim, glowing |
| Checkbox box (the square) | transparent PNG | unchecked, checked |
| Radio dot (the circle) | transparent PNG | unselected, selected |
| Slider empty track | transparent PNG | always same |
| Slider filled bar | transparent PNG | full-width (DWIN clips) |
| Slider thumb knob | transparent PNG | always same |
| Push button | transparent PNG | released, pressed |
| Status badge | transparent PNG | connected, disconnected |
| Device status badge | transparent PNG | online, offline |

### Mode System
- **Normal** (no param) — full UI visible, all interactive elements functional.
- **Base** (`?mode=base`) — hides dynamic elements (icons, toggle knobs, text, LEDs) leaving a clean background BMP.
- **Guide** (`?mode=guide`) — pure black screen with only touch hitboxes shown in magenta for DGUS touch config.
- The ripper navigates these via `window.setDgusBaseMode()`, `window.setDgusGuideMode()`, `window.resetDgusMode()`.
- Connection state is toggled via `window.toggleConnection()`.

### Mode System
- **Normal** (no param) — full UI visible, all interactive elements functional.
- **Base** (`?mode=base`) — hides dynamic elements (icons, toggle knobs, text, LEDs) leaving a clean background BMP.
- **Guide** (`?mode=guide`) — pure black screen with only touch hitboxes shown in magenta for DGUS touch config.
- The ripper navigates these via `window.setDgusBaseMode()`, `window.setDgusGuideMode()`, `window.resetDgusMode()`.
- Connection state is toggled via `window.toggleConnection()`.

### Verification
- Run `npm run dev` and preview at `localhost:3000`.
- Check modes: `localhost:3000?mode=base`, `localhost:3000?mode=guide`.
- Verify all elements listed in `rip-config.yaml` exist in the DOM with correct selectors.
- Run `make rip` to generate test output in `DWIN_SET/`.
