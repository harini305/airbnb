"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { exploreHref } from "@/lib/format";
import styles from "@/app/services/[slug]/detail.module.css";

export default function BackLink() {
  const back = useSearchParams().get("back");
  // Rebuilt from known keys only, so the link always stays on /explore.
  const href = back !== null ? exploreHref(Object.fromEntries(new URLSearchParams(back))) : "/explore";

  return (
    <Link href={href} prefetch={false} className={styles.back}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {back !== null ? "Back to results" : "Explore all services"}
    </Link>
  );
}
