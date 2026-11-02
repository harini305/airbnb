"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import styles from "./Header.module.css";

const NAV = [
  { href: "/explore", label: "Services", icon: "services-bell", video: "services-bell-selected" },
  { href: "/#destinations", label: "Destinations", icon: "all-globe", video: "all-globe-selected" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Logo />

        <nav aria-label="Main" className={styles.nav}>
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              video={item.video}
              className={styles.navLink}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.right}>
          <Link
            href="/offer-a-service"
            prefetch={false}
            className={styles.hostLink}
            aria-current={pathname.startsWith("/offer-a-service") ? "page" : undefined}
          >
            Offer your service
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuIcon} data-open={open} aria-hidden="true" />
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} hidden={!open}>
        <nav aria-label="Mobile" className="container">
          {[...NAV, { href: "/offer-a-service", label: "Offer your service" }].map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              video={item.video}
              className={styles.mobileLink}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
