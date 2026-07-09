# etRipper

HTML to DWIN display asset ripper. Design your UI in React, rip individual elements as BMPs via Playwright.

## Prerequisites

- Node.js 20+
- Python 3.10+
- `venv/` at project root (populated via `make install`)

## Setup

```sh
make install          # npm install + pip install -r ripper/requirements.txt
make install-browser  # also download Playwright Chromium
```

## Workflow

### 1. Design the UI

Screen components live in `src/components/`. Layout is assembled in `src/App.tsx` inside a `<Canvas>` wrapper. Styles go in `src/styles/global.css`.

Start the dev server:

```sh
npm run dev
# or
make dev
```

Preview at `http://localhost:3000`. Check DGUS output modes:
- `http://localhost:3000` — normal mode (full UI)
- `http://localhost:3000?mode=base` — clean background (dynamic elements hidden)
- `http://localhost:3000?mode=guide` — black screen + magenta touch hitboxes

### 2. Write a rip config (`rip-config.yaml`)

The config is a list of captures. Each capture tells the ripper what element to screenshot, where to save it, and any setup to run first.

```yaml
screen:
  width: 480
  height: 800

captures:
  # Page background (base mode hides dynamic elements, with page)
  - selector: "#page-00"
    output: "00.bmp"
    mode: base
    full: true
    page: "00"

  # Guide overlay for DGUS touch config
  - selector: "#page-00"
    output: "00_Guide_Hitboxes.bmp"
    mode: guide
    full: true
    page: "00"

  # Static widget
  - selector: "#ui-header"
    output: "Icon_Sources/001_Header.bmp"
    page: "00"

  # Toggle with two states
  - selector: "#ctrl-1"
    output: "Icon_Sources/010_Light_1_OFF.bmp"
    page: "00"
  - selector: "#ctrl-1"
    output: "Icon_Sources/011_Light_1_ON.bmp"
    page: "00"
    setup: "document.querySelector('#ctrl-1 input').click()"
```

**Capture fields:**

| Field | Required | Description |
|---|---|---|
| `selector` | yes | CSS selector for the target element |
| `output` | yes | Path relative to `DWIN_SET/` |
| `page` | no | Page ID (`"00"`, `"01"`...) — ripper calls `window.setPage(n)` before capture |
| `mode` | no | `"base"` or `"guide"` — switch DGUS mode before capture |
| `setup` | no | JavaScript to run before capture (e.g., toggle, navigate state) |
| `full` | no | Use element `.screenshot()` instead of element-level capture |

**Naming conventions:**

| File | Convention | Example |
|---|---|---|
| Page backgrounds | `NN_{Name}.bmp` | `00_MainScreen.bmp`, `01_ControlsLab.bmp` |
| Guide overlay | `NN_Guide_Hitboxes.bmp` | `00_Guide_Hitboxes.bmp`, `01_Guide_Hitboxes.bmp` |
| Element captures | `Icon_Sources/{NNN}_{Name}_{STATE}.bmp` | `Icon_Sources/010_Light_1_OFF.bmp` |

- All output is 24-bit BMP (no alpha). Guide hitboxes use the same BMP format — they are swapped with the background on the display for touch alignment.
- The `page` field tells the ripper to switch pages before capture. The ripper tracks the current page and only calls `window.setPage(n)` when the page changes.

### 3. Rip assets

```sh
make rip
# or manually:
./venv/bin/python3 ripper/rip.py http://localhost:3000 --config rip-config.yaml
```

Output goes to `DWIN_SET/`. Copy this folder to an SD card formatted as FAT32 (4096 byte clusters) and insert into the DWIN display.

## Makefile Reference

```
make dev             Start Vite dev server
make build           Production build
make install         Install JS + Python deps
make install-browser Also download Playwright Chromium
make rip             Start server, rip assets, stop server
```
