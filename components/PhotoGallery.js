"use client";

import { useRef, useState } from "react";
import Img from "./Img";
import styles from "@/app/services/[slug]/detail.module.css";

// Mosaic of the first five photos plus a full-screen viewer for all of them.
export default function PhotoGallery({ photos, title }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef(null);
  const total = photos.length;

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const go = (i) => setIndex((i + total) % total);

  function onKeyDown(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  }

  return (
    <section className={styles.gallery} aria-label={`Photos of ${title}`}>
      <div className={styles.mosaic}>
        {photos.slice(0, 5).map((p, i) => (
          <button key={p} type="button" className={styles.tile} onClick={() => open(i)} aria-label={`Open photo ${i + 1} of ${total}`}>
            <Img
              src={`detail/${p}`}
              widths={[640, 1280]}
              sizes={i === 0 ? "(min-width: 744px) 50vw, 100vw" : "(min-width: 744px) 25vw, 100vw"}
              alt=""
              ratio={0.75}
              priority={i < 3}
            />
          </button>
        ))}
        <button type="button" className={`btn ${styles.showAll}`} onClick={() => open(0)}>
          Show all {total} photos
        </button>
      </div>

      <dialog ref={dialogRef} className={styles.viewer} aria-label="Photo viewer" onKeyDown={onKeyDown}>
        <div className={styles.viewerBar}>
          <span aria-live="polite">{index + 1} / {total}</span>
          <button type="button" className={styles.viewerClose} onClick={() => dialogRef.current?.close()} autoFocus>
            Close
          </button>
        </div>
        <div className={styles.viewerStage}>
          <button type="button" className={styles.viewerNav} onClick={() => go(index - 1)} aria-label="Previous photo">
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <Img key={photos[index]} src={`detail/${photos[index]}`} widths={[640, 1280]} sizes="90vw" alt={`Photo ${index + 1} of ${total} from ${title}`} ratio={0.75} className={styles.viewerImg} />
          <button type="button" className={styles.viewerNav} onClick={() => go(index + 1)} aria-label="Next photo">
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className={styles.viewerThumbs}>
          {photos.map((p, i) => (
            <button key={p} type="button" aria-pressed={i === index} aria-label={`Show photo ${i + 1}`} onClick={() => setIndex(i)}>
              <Img src={`detail/${p}`} widths={[640]} sizes="72px" alt="" ratio={0.75} />
            </button>
          ))}
        </div>
      </dialog>
    </section>
  );
}
