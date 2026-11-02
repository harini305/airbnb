"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { categories, filterListings, getCategory, getLocation, locations, SNAPSHOT_DATE, sortOptions } from "@/data/catalog";
import { exploreHref, formatDate } from "@/lib/format";
import styles from "./explore.module.css";

function readCriteria(params) {
  const pick = (key, ok) => (ok(params.get(key)) ? params.get(key) : "");
  return {
    category: pick("category", getCategory),
    location: pick("location", getLocation),
    sort: pick("sort", (v) => sortOptions.some((o) => o.value && o.value === v)),
    date: pick("date", (v) => /^\d{4}-\d{2}-\d{2}$/.test(v ?? "")),
  };
}

function titleFor({ category, location }, count) {
  const cat = getCategory(category)?.label.toLowerCase();
  const loc = getLocation(location)?.label;
  const noun = count === 1 ? "service" : "services";
  return `Explore ${count} ${cat ? `${cat} ` : ""}${noun}${loc ? ` in ${loc}` : ""}`;
}

export default function ExploreClient() {
  const router = useRouter();
  const params = useSearchParams();
  const criteria = readCriteria(params);
  const results = filterListings(criteria);
  const query = exploreHref(criteria).replace("/explore", "").replace(/^\?/, "");

  const update = (patch) => router.replace(exploreHref({ ...criteria, ...patch }), { scroll: false });
  const reset = () => router.replace("/explore", { scroll: false });

  return (
    <>
      <section className={styles.head} aria-labelledby="explore-title">
        <div className="container">
          <h1 id="explore-title" className={styles.title} aria-live="polite">{titleFor(criteria, results.length)}</h1>
          <SearchBar
            key={`${criteria.location}|${criteria.date}|${criteria.category}`}
            initial={criteria}
            extra={{ sort: criteria.sort }}
            compact
          />
          {criteria.date && (
            <p className={styles.dateNote}>
              {formatDate(criteria.date)}: availability isn&apos;t checked in this demo, so all services are shown.
            </p>
          )}
        </div>
      </section>

      <section className={`fit-footer ${styles.results}`} aria-label="Results">
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.chips} role="group" aria-label="Type of service">
              <button type="button" className={styles.chip} aria-pressed={!criteria.category} onClick={() => update({ category: "" })}>
                All types
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  className={styles.chip}
                  aria-pressed={criteria.category === c.slug}
                  onClick={() => update({ category: c.slug })}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className={styles.controls}>
              <div className={styles.places} role="group" aria-label="Destination">
                <button type="button" className={styles.place} aria-pressed={!criteria.location} onClick={() => update({ location: "" })}>
                  Anywhere
                </button>
                {locations.map((l) => (
                  <button
                    key={l.slug}
                    type="button"
                    className={styles.place}
                    aria-pressed={criteria.location === l.slug}
                    onClick={() => update({ location: l.slug })}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <label className={styles.select}>
                <span>Sort</span>
                <select value={criteria.sort} onChange={(e) => update({ sort: e.target.value })}>
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {results.length > 0 ? (
            <ul className={styles.grid}>
              {results.map((l, i) => (
                <li key={l.id}>
                  <ServiceCard listing={l} back={query} headingLevel={2} priority={i < 4} sizes="(min-width: 1280px) 300px, (min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw" />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty} role="status">
              <div>
                <h2>No matches in the {SNAPSHOT_DATE} snapshot</h2>
                <p className="muted">
                  The audit captured {filterListings().length} services across three destinations. Try another type of
                  service or destination.
                </p>
                <div className={styles.emptyActions}>
                  {criteria.location && criteria.category && (
                    <button type="button" className="btn btn-ghost" onClick={() => update({ location: "" })}>
                      {getCategory(criteria.category).label} anywhere
                    </button>
                  )}
                  <button type="button" className="btn btn-dark" onClick={reset}>
                    Show all services
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
