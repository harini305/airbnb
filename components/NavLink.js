"use client";

import Link from "next/link";
import { useRef } from "react";

// Header link with the original 3D tab icon: static poster, and the
// original "selected" WebM animation plays on hover or keyboard focus.
export default function NavLink({ href, icon, video, children, className, ...rest }) {
  const ref = useRef(null);

  const play = () => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  return (
    <Link href={href} prefetch={false} className={className} onMouseEnter={play} onFocus={play} {...rest}>
      {icon && (
        <video
          ref={ref}
          src={`/images/nav/${video}.webm`}
          poster={`/images/nav/${icon}-120.webp`}
          muted
          playsInline
          preload="none"
          width="36"
          height="36"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <span>{children}</span>
    </Link>
  );
}
