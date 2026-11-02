"""Builds data/listings.json from the Phase 1 snapshot (docs/source-audit/data).

Values are copied as captured on 29 Oct 2026. Presentation-only fixes:
- raw line breaks in titles are joined (audit issue C7)
- "suman" is capitalised (C7)
Category is not stored per listing in the snapshot; it is inferred from the
title and flagged with categoryInferred=True.
"""
import json
import os
import re

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "docs", "source-audit", "data", "services-page-content.json")
OUT = os.path.join(ROOT, "data", "listings.json")

CATEGORY_RULES = [
    ("make-up", re.compile(r"make-?up", re.I)),
    ("training", re.compile(r"yoga|training|mobility", re.I)),
    ("photography", re.compile(r"photo|portrait|moments|memories", re.I)),
]

LOCATIONS = {
    "Photography": ("sholinganallur", "Sholinganallur"),
    "Services in Bengaluru": ("bengaluru", "Bengaluru"),
    "Services in South Goa": ("south-goa", "South Goa"),
}


def money(text):
    return int(re.sub(r"[^\d]", "", text))


def clean_title(t):
    t = re.sub(r"\s*\n+\s*", " — ", t.strip())
    return t.replace("by suman", "by Suman")


def category_for(title):
    for slug, rx in CATEGORY_RULES:
        if rx.search(title):
            return slug
    return None


def main():
    data = json.load(open(SRC, encoding="utf8"))
    sections = [("Photography", data["local_section"]["carousel"]["items"])]
    sections += [(s["title"], s["items"]) for s in data["destination_sections"]]

    listings = []
    for section, items in sections:
        loc_slug, loc_label = LOCATIONS[section]
        for it in items:
            price = it["price"]
            if isinstance(price, dict):
                value, unit = money(price["price"]), price["qualifier"].strip(" /")
                rating, count = it.get("rating_average") or 0, int(it.get("rating_count") or 0)
                badges = it.get("badges", [])
            else:
                value, unit = money(price), it["qualifier"].strip(" /")
                rating, count, badges = it.get("rating_average") or 0, 0, []
            entry = {
                "id": it["id"],
                "title": clean_title(it["title"]),
                "category": category_for(it["title"]),
                "categoryInferred": True,
                "location": loc_slug,
                "locationLabel": loc_label,
                "price": value,
                "unit": unit,
                "rating": rating if count or rating else None,
                "reviews": count,
                "badge": badges[0] if badges else None,
            }
            img = os.path.join(ROOT, "assets-source", "hd", f"{it['id']}-cover.jpg")
            w, h = Image.open(img).size
            entry["imageRatio"] = round(w / h, 3)
            listings.append(entry)

    # 7131141: the results page showed ₹2,500 struck through → ₹2,000, and the
    # detail page reports 3 reviews (audit 03 §6, issue C1).
    for l in listings:
        if l["id"] == "7131141":
            l["originalPrice"] = 2500
            l["reviews"] = 3

    json.dump(listings, open(OUT, "w", encoding="utf8"), ensure_ascii=False, indent=2)
    print(len(listings), "listings")


if __name__ == "__main__":
    main()
