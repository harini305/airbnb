"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Img from "./Img";
import { getListing } from "@/data/catalog";
import styles from "@/app/page.module.css";

gsap.registerPlugin(useGSAP);

// Three equal frames, each crossfading between two real listing covers.
const COLUMNS = [
  ["7284477", "7243229"],
  ["7346510", "7352324"],
  ["7190896", "6539365"],
];

export default function HeroTriptych() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-frame]", { autoAlpha: 0, y: 24, duration: 0.8, ease: "power3.out", stagger: 0.1 });
        gsap.utils.toArray("[data-frame]").forEach((frame, i) => {
          // One GPU-composited zoom per frame (not per image) and an opacity-only
          // crossfade: toggling visibility or scaling two layers separately makes
          // the photo snap by a sub-pixel at each swap, which reads as a shake.
          const zoom = frame.querySelector("[data-zoom]");
          const next = frame.querySelectorAll("img")[1];
          gsap.to(zoom, { scale: 1.04, duration: 10, ease: "sine.inOut", repeat: -1, yoyo: true, force3D: true });
          gsap
            .timeline({ repeat: -1, delay: 2.5 + i * 1.2 })
            .to(next, { opacity: 1, duration: 1.6, ease: "sine.inOut" })
            .to(next, { opacity: 0, duration: 1.6, ease: "sine.inOut" }, "+=4");
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={styles.triptych} aria-hidden="true">
      {COLUMNS.map(([first, second], i) => {
        const l1 = getListing(first);
        const l2 = getListing(second);
        return (
          <div key={first} className={styles.frame} data-frame>
            <div className={styles.frameZoom} data-zoom>
              <Img src={`listings/${first}`} widths={[480, 960]} sizes="(min-width: 1128px) 16vw, 33vw" alt="" ratio={l1.imageRatio} priority={i < 3} className={styles.frameImg} />
              <Img src={`listings/${second}`} widths={[480, 960]} sizes="(min-width: 1128px) 16vw, 33vw" alt="" ratio={l2.imageRatio} className={`${styles.frameImg} ${styles.frameNext}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
