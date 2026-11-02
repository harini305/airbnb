const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value) {
  return inr.format(value);
}

export function priceA11y(listing) {
  const base = `From ${formatINR(listing.price)} per ${listing.unit}`;
  return listing.originalPrice ? `${base}, previously ${formatINR(listing.originalPrice)}` : base;
}

// Builds an /explore URL from a criteria object, dropping empty values.
export function exploreHref(criteria = {}) {
  const params = new URLSearchParams();
  for (const key of ["category", "location", "date", "sort"]) {
    if (criteria[key]) params.set(key, criteria[key]);
  }
  const qs = params.toString();
  return qs ? `/explore?${qs}` : "/explore";
}

export function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
