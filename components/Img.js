// Responsive <img> for the pre-generated WebP sets in public/images.
// Next.js image optimisation is disabled (images.unoptimized), so sizes come from srcset.
export default function Img({ src, widths, sizes, alt, priority = false, className, ratio = 1, ...rest }) {
  const largest = widths[widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static WebP sets, optimisation disabled by design
    <img
      src={`/images/${src}-${largest}.webp`}
      srcSet={widths.map((w) => `/images/${src}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round(largest / ratio)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
