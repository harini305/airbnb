"use client";

import { useEffect, useRef, useState } from "react";
import ShowDates from "./ShowDates";
import { formatINR } from "@/lib/format";
import styles from "@/app/services/[slug]/detail.module.css";

// Two-column detail body: offerings in the main column, a sticky booking card
// on desktop, and a bottom booking bar on mobile.
export default function DetailBooking({ detail, before, after }) {
  const [choice, setChoice] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const cardRef = useRef(null);
  const offering = detail.offerings[choice];

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setShowBar(![...seen.values()].some(Boolean));
    });
    if (cardRef.current) io.observe(cardRef.current);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const summary = [
    ["Option", offering.title],
    ["Price", `${formatINR(offering.price)} / ${detail.unit}`],
    ["Duration", offering.duration],
  ];

  return (
    <>
      <div className={`container fit-footer ${styles.layout}`}>
        <div className={styles.before}>{before}</div>

        <section className={styles.offerings} aria-labelledby="options-title">
          <h2 id="options-title" className={styles.h2}>Choose an option</h2>
          <div className={styles.optionList} role="radiogroup" aria-labelledby="options-title">
            {detail.offerings.map((o, i) => (
              <label key={o.title} className={styles.option} data-checked={i === choice}>
                <input type="radio" name="offering" checked={i === choice} onChange={() => setChoice(i)} className={styles.optionInput} />
                <span className={styles.optionBody}>
                  <span className={styles.optionTitle}>{o.title}</span>
                  <span className="muted">{o.description}</span>
                  <span className={styles.optionMeta}>
                    {o.duration}
                    {o.minimum ? ` · Minimum ${formatINR(o.minimum)} to book` : ""}
                  </span>
                </span>
                <span className={styles.optionPrice}>
                  {formatINR(o.price)}<span className="muted"> / {detail.unit}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="muted">{detail.customiseNote}</p>
        </section>

        <aside className={styles.aside} aria-labelledby="booking-title">
          <div className={styles.card} ref={cardRef} id="booking">
            <h2 id="booking-title" className={styles.cardTitle}>
              From {formatINR(detail.priceFrom)} <span className="muted">/ {detail.unit}</span>
            </h2>
            <p className={styles.cancel}>
              <strong>{detail.cancellation}</strong> · {detail.cancellationDetail}
            </p>
            <div className={styles.cardChoice}>
              <span className="muted">Selected option</span>
              <strong>{offering.title}</strong>
              <span>
                {formatINR(offering.price)} / {detail.unit} · {offering.duration}
                {offering.minimum ? ` · Minimum ${formatINR(offering.minimum)}` : ""}
              </span>
            </div>
            <ShowDates title={detail.title} summary={summary} className={styles.cta} />
          </div>
        </aside>

        <div className={styles.after}>{after}</div>
      </div>

      <div className={styles.mobileBar} data-visible={showBar} aria-hidden={!showBar}>
        <p>
          <strong>From {formatINR(detail.priceFrom)}</strong> / {detail.unit}
          <span className={styles.mobileBarNote}>{detail.cancellation}</span>
        </p>
        <a href="#booking" className="btn btn-primary" tabIndex={showBar ? 0 : -1}>
          Show dates
        </a>
      </div>
    </>
  );
}
