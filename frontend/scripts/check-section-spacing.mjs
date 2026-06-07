/**
 * Layout regression check: Why cards must not overlap Journey intro.
 * Requires dev server at http://localhost:3000 (or set BASE_URL).
 *
 * Usage: npm run check:spacing
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const MIN_GAP_PX = 192;

async function main() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error("check:spacing requires playwright. Run: npx playwright install chromium");
    process.exit(1);
  }

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const layout = await page.evaluate(() => {
      const cards = [...document.querySelectorAll("#why .reveal")].filter((el) =>
        el.matches("article")
      );
      const label = document.querySelector("#journey .text-label");
      const why = document.getElementById("why");
      const journey = document.getElementById("journey");

      const lastRow = cards.slice(-3);
      const maxCardBottom = Math.max(...lastRow.map((c) => c.getBoundingClientRect().bottom));
      const labelTop = label?.getBoundingClientRect().top ?? 0;
      const whyBottom = why?.getBoundingClientRect().bottom ?? 0;
      const journeyTop = journey?.getBoundingClientRect().top ?? 0;

      const cardTransforms = cards.map((c) => ({
        title: c.querySelector("h3")?.textContent?.slice(0, 30),
        transform: getComputedStyle(c).transform,
        inlineTransform: c.style.transform || "none",
      }));

      return {
        gapLabelToCards: labelTop - maxCardBottom,
        gapWhyToJourney: journeyTop - whyBottom,
        cardTransforms,
      };
    });

    console.log("Why bottom → Journey top:", `${layout.gapWhyToJourney}px`);
    console.log("Last row cards → OUR JOURNEY label:", `${layout.gapLabelToCards}px`);

    let failed = false;

    if (layout.gapLabelToCards < MIN_GAP_PX) {
      console.error(`FAIL: gap ${layout.gapLabelToCards}px < minimum ${MIN_GAP_PX}px`);
      failed = true;
    } else {
      console.log(`PASS: section gap >= ${MIN_GAP_PX}px`);
    }

    const badTransforms = layout.cardTransforms.filter(
      (c) => c.inlineTransform !== "none" && c.inlineTransform !== ""
    );
    if (badTransforms.length > 0) {
      console.error("FAIL: cards have inline transform from GSAP:", badTransforms);
      failed = true;
    } else {
      console.log("PASS: no inline transforms on Why cards");
    }

    const matrixTransforms = layout.cardTransforms.filter(
      (c) => c.transform !== "none" && !c.transform.includes("matrix(1, 0, 0, 1, 0, 0)")
    );
    if (matrixTransforms.length > 0) {
      console.warn(
        "WARN: cards still have computed transform (may be mid-reveal CSS):",
        matrixTransforms.map((c) => c.title)
      );
    }

    if (failed) process.exit(1);
    console.log("All spacing checks passed.");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
