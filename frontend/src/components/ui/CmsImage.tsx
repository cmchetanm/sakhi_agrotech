import Image from "next/image";
import { isRailsBlobUrl } from "@/lib/media";

interface CmsImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

/** Use native img for Rails Active Storage blobs; Next/Image cannot optimize redirect URLs. */
export default function CmsImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
}: CmsImageProps) {
  if (isRailsBlobUrl(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={className}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }

  if (fill) {
    return <Image src={src} alt={alt} fill className={className} priority={priority} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1}
      height={height ?? 1}
      className={className}
      priority={priority}
    />
  );
}
