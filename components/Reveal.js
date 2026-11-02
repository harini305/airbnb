"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fades and lifts descendants marked [data-reveal] as they enter the viewport.
// Content is visible without JS; under reduced motion nothing animates, and a
// timeout guarantees everything is visible even if a trigger never fires.
export default function Reveal({ as: Tag = "div", children, className, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Only below-the-fold items animate, so nothing visible on load flickers.
        const items = gsap.utils
          .toArray("[data-reveal]", ref.current)
          .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
        if (!items.length) return;

        items.forEach((el, i) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: (i % 4) * 0.05,
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }
          );
        });

        const failsafe = setTimeout(() => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.3, overwrite: "auto" }), 2500);
        return () => clearTimeout(failsafe);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
