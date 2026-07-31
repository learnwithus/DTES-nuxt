export const VIEWPORT = { width: 1440, height: 900 };

/**
 * Bring a route to a state worth capturing: hydrated, fonts resolved, images
 * decoded, and animations settled.
 */
export async function preparePage(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // Typekit is loaded from an external stylesheet; capturing before it resolves
  // gives a fallback-font document.
  await page
    .evaluate(() => document.fonts.ready.then(() => true))
    .catch(() => {});

  await triggerLazyImages(page);
  await settleMedia(page);
}

/**
 * The site uses vue-lazyload, which only fetches an image once it scrolls into
 * view. Nothing scrolls during an export, so anything below the fold would be
 * captured as an empty placeholder — on /tour/videos that meant eight blank
 * thumbnails. Walk the full height to trip the observers, then return to the top
 * so the capture starts where the page really starts.
 */
async function triggerLazyImages(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const height = () => document.body.scrollHeight;

    for (let y = 0; y < height(); y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }

    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));
  });
}

/**
 * Wait for images and video posters to actually paint.
 *
 * The /watch routes matter most here: plyr is now imported lazily inside
 * mounted(), so there is a real async gap between hydration and the poster
 * frame appearing. Capturing too early yields a black rectangle.
 */
async function settleMedia(page) {
  await page
    .evaluate(async () => {
      const images = [...document.images]
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
        );

      // A video's poster is not exposed as a load event, so preload it as an
      // ordinary image and let the browser cache serve the <video> element.
      const posters = [...document.querySelectorAll("video[poster]")].map(
        (video) =>
          new Promise((resolve) => {
            const probe = new Image();
            probe.addEventListener("load", resolve, { once: true });
            probe.addEventListener("error", resolve, { once: true });
            probe.src = video.getAttribute("poster");
          })
      );

      await Promise.all([...images, ...posters]);
    })
    .catch(() => {});

  // Entry transitions and background cross-fades are driven by timers in the
  // store, not by anything observable from the DOM.
  await page.waitForTimeout(900);
}

/**
 * Render the current page state to PDF bytes.
 *
 * Screen media is emulated deliberately: the export is meant to be a faithful
 * capture of the site as it looks in a browser, not a reflowed print document.
 * Pinning the PDF width to the viewport width means nothing re-lays-out, while
 * leaving the height unset lets long routes flow onto continuation pages.
 */
export async function renderPdf(page) {
  return page.pdf({
    width: `${VIEWPORT.width}px`,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
}
