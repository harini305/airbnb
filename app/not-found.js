import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section fit-footer" style={{ background: "var(--grey-1)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <h1>We can&apos;t seem to find the page you&apos;re looking for</h1>
        <p className="lead">The link may be mistyped, or the service may not be in the snapshot.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link href="/" prefetch={false} className="btn btn-dark">Go to the home page</Link>
          <Link href="/explore" prefetch={false} className="btn btn-ghost">Explore services</Link>
        </div>
      </div>
    </section>
  );
}
