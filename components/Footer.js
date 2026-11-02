"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Logo from "./Logo";
import { SNAPSHOT_DATE } from "@/data/catalog";
import styles from "./Footer.module.css";

export default function Footer() {
  const ref = useRef(null);

  // Publishes the real footer height so `.fit-footer` sections can share one viewport with it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--footer-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer ref={ref} className={styles.footer} id="site-footer">
      <div className={`container ${styles.inner}`}>
        <Logo onDark />
        <nav aria-label="Footer" className={styles.links}>
          <Link href="/explore" prefetch={false}>Explore services</Link>
          <Link href="/#destinations" prefetch={false}>Destinations</Link>
          <Link href="/offer-a-service" prefetch={false}>Offer your service</Link>
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <span>Redesign demo from the {SNAPSHOT_DATE} snapshot · not the official Airbnb website</span>
        <span>English (IN) · ₹ INR</span>
      </div>
    </footer>
  );
}
