import Link from "next/link";
import styles from "./Header.module.css";

export default function Logo({ onDark = false }) {
  return (
    <Link href="/" prefetch={false} className={styles.logo} aria-label="Airbnb Services home">
      {/* eslint-disable-next-line @next/next/no-img-element -- original SVG wordmark */}
      <img
        src={onDark ? "/images/brand/airbnb-logo-white.svg" : "/images/brand/airbnb-logo.svg"}
        alt=""
        width="102"
        height="32"
      />
    </Link>
  );
}
