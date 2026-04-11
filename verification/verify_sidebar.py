from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Path to sidebar.html
        cwd = os.getcwd()
        sidebar_path = f"file://{cwd}/packages/eko-swarm-extension/dist/sidebar.html"

        print(f"Navigating to {sidebar_path}")
        page.goto(sidebar_path)

        # Wait for React to render
        page.wait_for_selector("#root", state="visible")

        # Take screenshot
        screenshot_path = "verification/sidebar.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
