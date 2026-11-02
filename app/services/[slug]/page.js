import { Suspense } from "react";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Img from "@/components/Img";
import PhotoGallery from "@/components/PhotoGallery";
import DetailBooking from "@/components/DetailBooking";
import ShowDates from "@/components/ShowDates";
import ServiceCard from "@/components/ServiceCard";
import { filterListings, getCategory, getListing, listings, SNAPSHOT_DATE } from "@/data/catalog";
import { details } from "@/data/content";
import { formatINR, priceA11y } from "@/lib/format";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  return { title: listing.title };
}

function Stars({ rating, reviews }) {
  if (!rating) return null;
  return (
    <span className={styles.stars}>
      <svg viewBox="0 0 32 32" width="14" height="14" aria-hidden="true">
        <path d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z" fill="currentColor" />
      </svg>
      {rating.toFixed(1)} · {reviews} {reviews === 1 ? "review" : "reviews"}
    </span>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const detail = details[listing.id];
  const cat = getCategory(listing.category);

  const top = (
    <div className={`container ${styles.top}`}>
      <Suspense fallback={<span className={styles.backPlaceholder} />}>
        <BackLink />
      </Suspense>
      <h1 className={styles.h1}>{listing.title}</h1>
      <p className={styles.meta}>
        <Stars rating={listing.rating} reviews={listing.reviews} />
        <span>{detail ? detail.role : `${cat.label} · ${listing.locationLabel}`}</span>
        {detail && <span>{detail.providedAt}</span>}
      </p>
    </div>
  );

  if (detail) {
    return (
      <article>
        {top}
        <div className="container">
          <PhotoGallery photos={detail.photos} title={listing.title} />
        </div>
        <DetailBooking
          detail={detail}
          before={
            <section className={styles.hostRow} aria-label="About the host">
              <Img src={`detail/${detail.host.avatar}`} widths={[240]} sizes="64px" alt={`${detail.host.name}, host`} ratio={0.46} className={styles.avatar} />
              <div>
                <p className={styles.hostName}>{detail.host.name} · {detail.host.role}</p>
                <p className="muted">{detail.bio}</p>
              </div>
            </section>
          }
          after={
            <>
              <section className={styles.block} aria-labelledby="reviews-title">
                <h2 id="reviews-title" className={styles.h2}>
                  <Stars rating={detail.rating} reviews={detail.reviews} />
                </h2>
                <p className={styles.fineprint}>
                  Guest review text belongs to the reviewers and isn&apos;t reproduced in this redesign.
                </p>
              </section>

              <section className={`${styles.block} ${styles.quals}`} aria-labelledby="quals-title">
                <h2 id="quals-title" className={styles.h2}>My qualifications</h2>
                <ul>
                  {detail.qualifications.map((q) => (
                    <li key={q.title}>
                      <strong>{q.title}</strong>
                      <span className="muted">{q.text}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.fineprint}>{detail.paymentNote}</p>
              </section>

              <section className={`${styles.block} ${styles.split}`} aria-label="Location and things to know">
                <div>
                  <h2 className={styles.h2}>I&apos;ll come to you</h2>
                  <p>{detail.location.comesToYou}</p>
                  <p className="muted">You can also come to me: {detail.location.comeToMe}</p>
                </div>
                <div>
                  <h2 className={styles.h2}>Things to know</h2>
                  <dl className={styles.facts}>
                    {detail.thingsToKnow.map((t) => (
                      <div key={t.title}>
                        <dt>{t.title}</dt>
                        <dd>{t.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            </>
          }
        />
      </article>
    );
  }

  // Listings captured only as cards in the snapshot.
  const more = filterListings({ location: listing.location }).filter((l) => l.id !== listing.id).slice(0, 4);

  return (
    <article>
      {top}
      <div className={`container ${styles.compact}`}>
        <div className={styles.cover}>
          <Img src={`listings/${listing.id}`} widths={[480, 960]} sizes="(min-width: 900px) 42vw, 100vw" alt={listing.title} ratio={listing.imageRatio} priority />
          {listing.badge && <span className={styles.badge}>{listing.badge}</span>}
        </div>
        <div className={styles.compactInfo}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle} aria-label={priceA11y(listing)}>
              From{" "}
              {listing.originalPrice && <s className="muted">{formatINR(listing.originalPrice)}</s>}{" "}
              {formatINR(listing.price)} <span className="muted">/ {listing.unit}</span>
            </h2>
            <dl className={styles.facts}>
              <div><dt>Type of service</dt><dd>{cat.label}</dd></div>
              <div><dt>Destination</dt><dd>{listing.locationLabel}</dd></div>
              {listing.rating ? <div><dt>Rating</dt><dd>{listing.rating.toFixed(1)} from {listing.reviews} {listing.reviews === 1 ? "review" : "reviews"}</dd></div> : null}
            </dl>
            <ShowDates title={listing.title} summary={[["Price", `From ${formatINR(listing.price)} / ${listing.unit}`]]} className={styles.cta} />
          </div>
          <p className={styles.fineprint}>
            Offerings, host details and policies for this service weren&apos;t captured in the {SNAPSHOT_DATE} snapshot,
            so only the card details are shown.
          </p>
        </div>
      </div>

      {more.length > 0 && (
        <section className={`section fit-footer ${styles.more}`} aria-labelledby="more-title">
          <div className="container">
            <h2 id="more-title" className={styles.moreTitle}>More services in {listing.locationLabel}</h2>
            <ul className={styles.moreGrid}>
              {more.map((l) => (
                <li key={l.id}>
                  <ServiceCard listing={l} fill sizes="(min-width: 1128px) 300px, (min-width: 560px) 45vw, 92vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
