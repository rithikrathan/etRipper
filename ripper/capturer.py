from playwright.sync_api import Page, Browser


def capture_element(page: Page, selector: str, filepath: str, padding: int = 0) -> None:
    el = page.locator(selector)
    box = el.bounding_box()
    if not box:
        print(f"  ✗ '{selector}' — not found, skipping")
        return

    page.screenshot(
        path=filepath,
        clip={
            "x": box["x"] - padding,
            "y": box["y"] - padding,
            "width": box["width"] + 2 * padding,
            "height": box["height"] + 2 * padding,
        },
        omit_background=True,
    )


def capture_full(page: Page, selector: str, filepath: str) -> None:
    page.locator(selector).screenshot(path=filepath)
