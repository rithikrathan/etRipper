import argparse
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import yaml
from playwright.sync_api import sync_playwright

from capturer import capture_element, capture_full


def load_config(path: str) -> dict:
    with open(path) as f:
        return yaml.safe_load(f)


def main():
    parser = argparse.ArgumentParser(description="etRipper — config-driven DWIN asset ripper")
    parser.add_argument("url", help="URL of the running canvas (e.g. http://localhost:3000)")
    parser.add_argument("--config", default="rip-config.yaml", help="Path to rip config YAML")
    parser.add_argument("--out", default="DWIN_SET", help="Output directory")
    args = parser.parse_args()

    config = load_config(args.config)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    screen = config.get("screen", {})
    sw = screen.get("width", 480)
    sh = screen.get("height", 800)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": sw, "height": sh},
            device_scale_factor=1,
        )
        page = context.new_page()
        page.goto(args.url)
        page.wait_for_load_state("networkidle")
        time.sleep(1.5)

        current_page = None

        for cap in config.get("captures", []):
            selector = cap["selector"]
            dest = out_dir / cap["output"]
            dest.parent.mkdir(parents=True, exist_ok=True)

            # Switch page if needed
            target_page = cap.get("page")
            if target_page and target_page != current_page:
                page.evaluate(f'window.changePage("{target_page}")')
                time.sleep(0.5)
                current_page = target_page

            mode = cap.get("mode")
            if mode:
                if mode == "base":
                    page.evaluate("window.setDgusBaseMode()")
                elif mode == "guide":
                    page.evaluate("window.setDgusGuideMode()")
                time.sleep(0.3)

            setup = cap.get("setup")
            if setup:
                page.evaluate(setup)
                time.sleep(0.3)

            if cap.get("full"):
                capture_full(page, selector, str(dest))
            else:
                capture_element(page, selector, str(dest), padding=cap.get("padding", 0))

            print(f"  → {dest}")

            if mode:
                page.evaluate("window.resetDgusMode()")
                time.sleep(0.1)

        browser.close()


if __name__ == "__main__":
    main()
