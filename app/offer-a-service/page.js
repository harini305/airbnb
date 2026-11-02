import Link from "next/link";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import { categories } from "@/data/catalog";
import { host } from "@/data/content";
import { exploreHref } from "@/lib/format";
import styles from "./offer.module.css";

export const metadata = {
  title: "Offer your service",
  description: host.lead,
};

const PROVIDERS = ["provider-1", "provider-2", "provider-3", "provider-4", "provider-5"];

export default function OfferPage() {
  return (
    <>
      <section className={styles.head} aria-labelledby="offer-title">
        <div className={`container ${styles.headInner}`}>
          <div>
            <h1 id="offer-title">{host.title}</h1>
            <p className="lead">{host.lead}</p>
          </div>
          <a href="#faq" className="btn btn-primary">Get started</a>
        </div>
      </section>

      <Reveal as="section" className={`section ${styles.best}`} aria-labelledby="best-title">
        <div className={`container ${styles.bestInner}`}>
          <div className={styles.bestCopy} data-reveal>
            <h2 id="best-title">{host.offer.title}</h2>
            <p className="lead">{host.offer.text}</p>
            <ul className={styles.types}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link prefetch={false} href={exploreHref({ category: c.slug })}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className={styles.portraits} aria-label="Service providers">
            {PROVIDERS.map((p, i) => (
              <li key={p} data-reveal>
                <Img src={`host/${p}`} widths={[480, 800]} sizes="(min-width: 1128px) 130px, 18vw" alt="" priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className={`section ${styles.customers}`} aria-labelledby="customers-title">
        <div className={`container ${styles.customersInner}`}>
          <div className={styles.customersCopy} data-reveal>
            <h2 id="customers-title">{host.customers.title}</h2>
            <p className="lead">{host.customers.text}</p>
          </div>
          <dl className={styles.stats} data-reveal>
            {host.customers.stats.map((s) => (
              <div key={s.value}>
                <dt>{s.value}</dt>
                <dd>
                  {s.label}
                  <span>{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Img src="host/guests-strip" widths={[960]} sizes="(min-width: 1128px) 600px, 92vw" alt="" className={styles.strip} />
        </div>
      </Reveal>

      <Reveal as="section" className={`section ${styles.reach}`} aria-labelledby="reach-title">
        <div className={`container ${styles.reachInner}`}>
          <div className={styles.phones} data-reveal>
            <Img src="host/app-listing" widths={[480, 800]} sizes="(min-width: 1128px) 280px, 45vw" alt="A service listing shown in the Airbnb app" />
            <Img src="host/app-listing-2" widths={[480, 800]} sizes="(min-width: 1128px) 280px, 45vw" alt="Another service listing shown in the Airbnb app" />
          </div>
          <div className={styles.reachCopy} data-reveal>
            <h2>{host.showUp.title}</h2>
            <p className="lead">{host.showUp.text}</p>
            <h3 id="reach-title" className={styles.h3}>{host.reach.title}</h3>
            <p className="muted">{host.reach.text}</p>
            <ul className={styles.reachList}>
              {host.reach.items.map((it) => (
                <li key={it.title}>
                  <strong>
                    {it.title}
                    {it.soon && <span className={styles.soon}>Coming soon</span>}
                  </strong>
                  <span className="muted">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className={`section ${styles.tools}`} aria-labelledby="tools-title">
        <div className="container">
          <div className={styles.toolsHead}>
            <h2 id="tools-title">{host.tools.title}</h2>
            <p className="lead">{host.tools.text}</p>
          </div>
          <ul className={styles.toolGrid}>
            {host.tools.items.map((t) => (
              <li key={t.title} data-reveal>
                <div className={styles.toolMedia}>
                  <Img src={`host/${t.image}`} widths={[480, 800]} sizes="(min-width: 1128px) 300px, (min-width: 600px) 45vw, 92vw" alt="" ratio={1.018} />
                </div>
                <h3 className={styles.toolTitle}>{t.title}</h3>
                <p className="muted">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <section id="faq" className={`section fit-footer ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={`container ${styles.faqInner}`}>
          {/* Pin method: the panel stays in view while the answers scroll beside it. */}
          <div className={styles.faqPin}>
            <div className={styles.faqPanel}>
              <h2 id="faq-title">Your questions, answered</h2>
              <div className={styles.faqArt} aria-hidden="true">
                {["1378905", "7331361", "2196204"].map((id) => (
                  <Img key={id} src={`listings/${id}`} widths={[480, 960]} sizes="(min-width: 900px) 160px, 30vw" alt="" />
                ))}
              </div>
              <Link prefetch={false} href="/explore" className="btn btn-dark">Explore services</Link>
            </div>
          </div>
          <div className={styles.faq}>
            {host.faq.map((item) => (
              <details key={item.q} className={styles.faqItem} open>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
