"use client";

import Link from "next/link";
import { useRef } from "react";
import { SNAPSHOT_DATE } from "@/data/catalog";
import styles from "@/app/services/[slug]/detail.module.css";

// The original "Show dates" opens Airbnb's availability and checkout, which a
// static redesign cannot reproduce. This explains that instead of faking a booking.
export default function ShowDates({ title, summary = [], className = "" }) {
  const ref = useRef(null);

  return (
    <>
      <button type="button" className={`btn btn-primary ${className}`} onClick={() => ref.current?.showModal()}>
        Show dates
      </button>
      <dialog ref={ref} className={styles.dialog} aria-labelledby="dates-title">
        <h2 id="dates-title" className={styles.h2}>Dates aren&apos;t available in this demo</h2>
        <p className={styles.dialogText}>
          This redesign is built from the {SNAPSHOT_DATE} snapshot, so it can&apos;t check the host&apos;s
          calendar or take a booking. Nothing has been reserved or charged.
        </p>
        <dl className={styles.summaryList}>
          <div><dt>Service</dt><dd>{title}</dd></div>
          {summary.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <div className={styles.dialogActions}>
          <button type="button" className="btn btn-dark" onClick={() => ref.current?.close()} autoFocus>
            Close
          </button>
          <Link href="/explore" prefetch={false} className="btn btn-ghost">
            Explore more services
          </Link>
        </div>
      </dialog>
    </>
  );
}
