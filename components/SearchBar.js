"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, locations } from "@/data/catalog";
import { exploreHref } from "@/lib/format";
import styles from "./SearchBar.module.css";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function SearchBar({ initial = {}, extra = {}, compact = false }) {
  const router = useRouter();
  const [location, setLocation] = useState(initial.location ?? "");
  const [date, setDate] = useState(initial.date ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const dateRef = useRef(null);

  // Set on the client only, so server and client markup match.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    router.push(exploreHref({ ...extra, location, date, category }), { scroll: !compact });
  }

  return (
    <form
      role="search"
      aria-label="Search services"
      className={`${styles.bar} ${compact ? styles.compact : ""}`}
      onSubmit={onSubmit}
    >
      <label className={`field ${styles.segment}`}>
        <span className="field-label">Where</span>
        <select className="control" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Search destinations</option>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>{l.label}</option>
          ))}
        </select>
      </label>
      <label className={`field ${styles.segment}`}>
        <span className="field-label">When</span>
        <input
          type="date"
          className={`control ${styles.date}`}
          ref={dateRef}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-empty={!date}
        />
      </label>
      <label className={`field ${styles.segment}`}>
        <span className="field-label">Type of service</span>
        <select className="control" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Add service</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>
      </label>
      <button type="submit" className={`btn btn-primary ${styles.submit}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        Search
      </button>
    </form>
  );
}
