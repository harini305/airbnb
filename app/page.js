import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import HeroTriptych from "@/components/HeroTriptych";
import ServiceCard from "@/components/ServiceCard";
import CityBrowser from "@/components/CityBrowser";
import Reveal from "@/components/Reveal";
import Img from "@/components/Img";
import { categories, countByCategory, filterListings, getListing, listings, SNAPSHOT_DATE } from "@/data/catalog";
import { home, host } from "@/data/content";
import { exploreHref } from "@/lib/format";
import styles from "./page.module.css";

const local = filterListings({ location: "sholinganallur" });

export default function Home() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title">{home.title}</h1>
            <p className="lead">{home.lead}</p>
            <SearchBar />
            <p className={styles.heroNote}>
              {listings.length} services in Sholinganallur, Bengaluru and South Goa · snapshot of {SNAPSHOT_DATE}
            </p>
          </div>
          <HeroTriptych />
        </div>
      </section>

      <Reveal as="section" className={`section ${styles.types}`} aria-labelledby="types-title">
        <div className="container">
          <div className={styles.rowHead}>
            <h2 id="types-title">Type of service</h2>
            <Link prefetch={false} href="/explore" className={styles.textLink}>Explore all services</Link>
          </div>
          <ul className={styles.typePhotos}>
            {categories.filter((c) => c.photo).map((c, i) => {
              const n = countByCategory(c.slug);
              return (
                <li key={c.slug} data-reveal>
                  <Link prefetch={false} href={exploreHref({ category: c.slug })} className={styles.typePhoto}>
                    <Img src={`listings/${c.photo}`} widths={[480, 960]} sizes="(min-width: 744px) 33vw, 80vw" alt="" ratio={getListing(c.photo).imageRatio} priority={i === 0} />
                    <span className={styles.typeLabel}>
                      <strong>{c.label}</strong>
                      <span>{n} {n === 1 ? "service" : "services"}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className={styles.typePills} aria-label="More types of service">
            {categories.filter((c) => !c.photo).map((c) => (
              <li key={c.slug}>
                <Link prefetch={false} href={exploreHref({ category: c.slug })}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className={`section ${styles.local}`} aria-labelledby="local-title">
        <div className={`container ${styles.localInner}`}>
          <div className={styles.localPanel} data-reveal>
            <Img src="detail/7131141-04" widths={[640, 1280]} sizes="(min-width: 1128px) 260px, 120px" alt="" ratio={0.8} className={styles.localArt} />
            <div className={styles.localCopy}>
              <h2 id="local-title">Photography in Sholinganallur</h2>
              <p className="muted">{local.length} photographers near Chennai</p>
              <Link prefetch={false} href={exploreHref({ location: "sholinganallur", category: "photography" })} className="btn btn-dark">
                See all
              </Link>
            </div>
          </div>
          <ul className={`${styles.rail} ${styles.localRail}`}>
            {local.map((l) => (
              <li key={l.id}>
                <ServiceCard listing={l} sizes="(min-width: 1128px) 240px, (min-width: 744px) 24vw, 70vw" />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" id="destinations" className={`section ${styles.cities}`} aria-labelledby="destinations-title">
        <div className="container">
          <CityBrowser />
        </div>
      </Reveal>

      <section className={`section fit-footer ${styles.offer}`} aria-labelledby="offer-title">
        <div className={`container ${styles.offerInner}`}>
          <div className={styles.offerCopy}>
            <h2 id="offer-title">{host.title}</h2>
            <p className="lead">{host.lead}</p>
            <p>{host.offer.text}</p>
            <Link prefetch={false} href="/offer-a-service" className="btn btn-primary">
              Offer your service
            </Link>
          </div>
          <div className={styles.offerVisual}>
            <ul className={styles.offerArt} aria-label="Service providers">
              {["provider-1", "provider-2", "provider-3", "provider-4", "provider-5"].map((p) => (
                <li key={p}>
                  <Img src={`host/${p}`} widths={[480, 800]} sizes="(min-width: 1128px) 140px, 18vw" alt="" />
                </li>
              ))}
            </ul>
            <div className={styles.offerStrip}>
              <Img src="host/guests-strip" widths={[960]} sizes="(min-width: 1128px) 700px, 92vw" alt="" ratio={3.25} />
              <p>{host.customers.text}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
