import Link from "next/link";
import Img from "./Img";
import { getCategory } from "@/data/catalog";
import { formatINR, priceA11y } from "@/lib/format";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ listing, back, headingLevel = 3, priority = false, sizes, fill = false }) {
  const cat = getCategory(listing.category);
  const href = back ? `/services/${listing.id}?back=${encodeURIComponent(back)}` : `/services/${listing.id}`;
  const H = `h${headingLevel}`;

  return (
    <article className={`${styles.card} ${fill ? styles.fill : ""}`} data-reveal>
      <Link href={href} prefetch={false} className={styles.link}>
        <div className={styles.media}>
          <Img
            src={`listings/${listing.id}`}
            widths={[480, 960]}
            sizes={sizes ?? "(min-width: 1280px) 300px, (min-width: 744px) 33vw, 80vw"}
            alt=""
            ratio={listing.imageRatio}
            priority={priority}
            className={styles.img}
          />
          {listing.badge && <span className={styles.badge}>{listing.badge}</span>}
        </div>
        <div className={styles.body}>
          <H className={styles.title}>{listing.title}</H>
          <p className={styles.meta}>
            {cat?.label} · {listing.locationLabel}
          </p>
          <p className={styles.row}>
            <span aria-label={priceA11y(listing)}>
              <span aria-hidden="true">
                From{" "}
                {listing.originalPrice && <s className={styles.was}>{formatINR(listing.originalPrice)}</s>}{" "}
                <strong>{formatINR(listing.price)}</strong> / {listing.unit}
              </span>
            </span>
            {listing.rating ? (
              <span className={styles.rating} aria-label={`Rated ${listing.rating.toFixed(1)} out of 5 from ${listing.reviews} reviews`}>
                <svg viewBox="0 0 32 32" width="12" height="12" aria-hidden="true">
                  <path d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z" fill="currentColor" />
                </svg>
                <span aria-hidden="true">{listing.rating.toFixed(1)} ({listing.reviews})</span>
              </span>
            ) : null}
          </p>
        </div>
      </Link>
    </article>
  );
}
