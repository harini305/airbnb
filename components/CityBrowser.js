"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { filterListings, getLocation } from "@/data/catalog";
import { exploreHref } from "@/lib/format";
import ServiceCard from "./ServiceCard";
import styles from "@/app/page.module.css";

const CITIES = ["bengaluru", "south-goa"];

// Merges the original "Services in Bengaluru" and "Services in South Goa" carousels.
export default function CityBrowser() {
  const [active, setActive] = useState(CITIES[0]);
  const tabRefs = useRef([]);
  const railRef = useRef(null);
  const list = filterListings({ location: active });
  const city = getLocation(active);

  function select(slug) {
    setActive(slug);
    railRef.current?.scrollTo({ left: 0 });
  }

  function onKeyDown(e, i) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + CITIES.length) % CITIES.length;
    select(CITIES[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div className={styles.cityHead}>
        <h2 id="destinations-title">Services in {city.label}</h2>
        <div role="tablist" aria-label="Destinations" className={styles.cityTabs}>
          {CITIES.map((slug, i) => (
            <button
              key={slug}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              type="button"
              id={`tab-${slug}`}
              aria-selected={active === slug}
              aria-controls="city-panel"
              tabIndex={active === slug ? 0 : -1}
              className={styles.cityTab}
              onClick={() => select(slug)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {getLocation(slug).label}
            </button>
          ))}
        </div>
      </div>

      <div id="city-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <p className="visually-hidden" aria-live="polite">{list.length} services in {city.label}</p>
        <ul className={`${styles.rail} ${styles.cityRail}`} ref={railRef}>
          {list.map((l) => (
            <li key={l.id}>
              <ServiceCard listing={l} sizes="(min-width: 1128px) 260px, (min-width: 744px) 30vw, 70vw" />
            </li>
          ))}
          <li className={styles.seeAllTile}>
            <Link prefetch={false} href={exploreHref({ location: active })}>
              <span>See all</span>
              <span className="muted">{list.length} services in {city.label}</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
