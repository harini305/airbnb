// Original Airbnb Services content from the Phase 1 snapshot (29 Oct 2026).
// Source files: docs/source-audit/03-content-inventory.md and data/*.json.
// Category labels follow the service-type panel (one naming scheme, audit issue C3).

import listingsData from "./listings.json";

export const SNAPSHOT_DATE = "29 Oct 2026";

// `photo` is a representative real listing cover. Only three types have
// listings in the snapshot; the others have no photo rather than an illustration.
export const categories = [
  { slug: "photography", label: "Photography", photo: "2196204" },
  { slug: "chefs", label: "Chefs" },
  { slug: "massage", label: "Massage" },
  { slug: "prepared-meals", label: "Prepared meals" },
  { slug: "training", label: "Training", photo: "1378905" },
  { slug: "make-up", label: "Make-up", photo: "7331361" },
  { slug: "hair", label: "Hair" },
  { slug: "spa-treatments", label: "Spa treatments" },
  { slug: "catering", label: "Catering" },
];

export const locations = [
  { slug: "sholinganallur", label: "Sholinganallur" },
  { slug: "bengaluru", label: "Bengaluru" },
  { slug: "south-goa", label: "South Goa" },
];

export const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export const listings = listingsData;

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getLocation = (slug) => locations.find((l) => l.slug === slug);
export const getListing = (id) => listings.find((l) => l.id === id);

export function filterListings({ category, location, sort } = {}) {
  let list = listings.filter(
    (l) => (!category || l.category === category) && (!location || l.location === location)
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.reviews - a.reviews);
  return list;
}

export const countByCategory = (slug) => listings.filter((l) => l.category === slug).length;
