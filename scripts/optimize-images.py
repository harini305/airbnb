"""Builds web-ready copies of the audited original assets.

Sources (not served):
  docs/source-audit/assets/   audit reference copies (720w photos, icons, logo)
  assets-source/hd/           1440w originals of listing/detail photos (same CDN URLs, im_w=1440)
  assets-source/host/         host-page images listed as remote-only in the manifest

Output: public/images/** as WebP (public/images/brand/*.svg logos are hand-placed, not generated) at a few fixed widths. Aspect ratios are preserved;
images are only ever scaled down. Run:  python scripts/optimize-images.py
"""
import glob
import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIT = os.path.join(ROOT, "docs", "source-audit", "assets")
HD = os.path.join(ROOT, "assets-source", "hd")
HOST = os.path.join(ROOT, "assets-source", "host")
OUT = os.path.join(ROOT, "public", "images")


# Byte budget per output width (~0.14 bytes/px); busy photos step quality down to fit, never below 62.
def budget(w):
    return int(w * w * 0.14)


def save(src, dest, widths, quality=80, keep_alpha=False):
    im = Image.open(src)
    im = im.convert("RGBA" if keep_alpha else "RGB")
    for w in widths:
        copy = im.copy()
        if copy.width > w:
            copy = copy.resize((w, round(copy.height * w / copy.width)), Image.LANCZOS)
        path = f"{dest}-{w}.webp"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        q = quality
        copy.save(path, "WEBP", quality=q, method=6)
        while os.path.getsize(path) > budget(w) and q > 62:
            q -= 4
            copy.save(path, "WEBP", quality=q, method=6)


def main():
    # Listing covers: HD source when available, else the audit copy.
    for f in glob.glob(os.path.join(AUDIT, "listings", "*-cover.jpg")):
        name = os.path.basename(f).replace("-cover.jpg", "")
        hd = os.path.join(HD, os.path.basename(f))
        save(hd if os.path.exists(hd) else f, os.path.join(OUT, "listings", name), [480, 960])

    # Detail sample (listing 7131141) gallery photos.
    for f in glob.glob(os.path.join(AUDIT, "detail-sample", "7131141-0*.jpg")):
        name = os.path.basename(f)[:-4]
        hd = os.path.join(HD, os.path.basename(f))
        save(hd if os.path.exists(hd) else f, os.path.join(OUT, "detail", name), [640, 1280])
    save(os.path.join(AUDIT, "detail-sample", "7131141-host-avatar.jpg"), os.path.join(OUT, "detail", "7131141-host"), [240])

    # The 3D category renders and isometric tiles are intentionally not exported:
    # the site uses real listing photos instead (owner request, 30 Oct 2026).

    # Header tab icons: static poster + the original selected-state animation.
    # Only the two tabs the header uses (Services, Destinations) are exported.
    for name in ("services-bell", "all-globe"):
        save(os.path.join(AUDIT, "nav-icons", f"{name}.png"), os.path.join(OUT, "nav", name), [120], quality=85, keep_alpha=True)
        shutil.copy(os.path.join(AUDIT, "nav-icons", f"{name}-selected.webm"), os.path.join(OUT, "nav", f"{name}-selected.webm"))

    # Host page imagery.
    host = {
        "9750528b": "provider-1", "193f0ed8": "provider-2", "6aab0543": "provider-3",
        "83c8a738": "provider-4", "f666738c": "provider-5", "4295dbae": "guests-strip",
        "c35cadac": "tool-reservations", "d80c443e": "tool-scheduling",
        "ecb5e352": "tool-messaging", "fca969eb": "tool-payments",
        "videothumb-1qVr6Fl5": "app-listing", "videothumb-Y6COYfUM": "app-listing-2",
    }
    for f in glob.glob(os.path.join(HOST, "*")):
        for key, name in host.items():
            if key in os.path.basename(f):
                widths = [960] if name == "guests-strip" else [480, 800]
                save(f, os.path.join(OUT, "host", name), widths, keep_alpha=name == "guests-strip")

    # Brand: favicon, apple icon and Open Graph image go to the app directory.
    app = os.path.join(ROOT, "app")
    shutil.copy(os.path.join(AUDIT, "brand", "favicon-240.png"), os.path.join(app, "icon.png"))
    shutil.copy(os.path.join(AUDIT, "brand", "apple-touch-icon-180.png"), os.path.join(app, "apple-icon.png"))
    shutil.copy(os.path.join(AUDIT, "brand", "og-image-services.jpg"), os.path.join(app, "opengraph-image.jpg"))


if __name__ == "__main__":
    main()
