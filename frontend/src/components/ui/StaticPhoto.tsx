interface StaticPhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/** Native img for local static assets — avoids Next/Image aspect-ratio wrapper and recompression. */
export default function StaticPhoto({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: StaticPhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
    />
  );
}
