export function StillPhoto({
  src,
  alt,
  priority = false,
  className = "aspect-video w-full bg-surface object-cover",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      srcSet={`${src} 400w, ${src} 800w, ${src} 1200w`}
      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
      alt={alt}
      width={800}
      height={320}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      className={className}
      onError={(event) => {
        const img = event.currentTarget;
        const tried = img.dataset.retry === "1";
        if (!tried && src) {
          img.dataset.retry = "1";
          img.src = src;
          return;
        }
        img.onerror = null;
        img.removeAttribute("srcset");
        img.alt = `${alt}. Still needed.`;
        img.src =
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="320"><rect fill="#1a1610" width="100%" height="100%"/></svg>`,
          );
      }}
    />
  );
}