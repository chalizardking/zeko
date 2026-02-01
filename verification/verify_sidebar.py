from playwright.sync_api import sync_playwright
import os

def verify_sidebar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Construct absolute path to sidebar.html
        cwd = os.getcwd()
        url = f"file://{cwd}/packages/eko-swarm-extension/dist/sidebar.html"

        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for React to render (root div content)
        # Since script tag might be missing type="module", it might fail.
        # But let's see.
        # If it fails, we will see console errors.

        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page Error: {exc}"))

        try:
            page.wait_for_selector("#root > div", timeout=5000)
            print("React rendered successfully.")
        except Exception as e:
            print("React failed to render within timeout. Checking page content...")
            print(page.content())

            # Check if script failed to load (e.g. syntax error due to ESM)

        # Check for select-none class
        # The Layout component renders a div.
        # We removed select-none.

        # Evaluate if any element has select-none class inside root
        has_select_none = page.evaluate("""() => {
            const root = document.getElementById('root');
            if (!root) return false;
            const layoutDiv = root.firstElementChild;
            if (!layoutDiv) return false;
            return layoutDiv.classList.contains('select-none');
        }""")

        if has_select_none:
            print("FAIL: 'select-none' class is still present.")
        else:
            print("PASS: 'select-none' class is NOT present.")

        # Take screenshot
        screenshot_path = "verification/sidebar.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_sidebar()
