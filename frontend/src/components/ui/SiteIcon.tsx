import Image from "next/image";
import clsx from "clsx";
import { isRailsBlobUrl } from "@/lib/media";

interface SiteIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function SiteIcon({ src, alt, size = 28, className }: SiteIconProps) {
  if (isRailsBlobUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={clsx("shrink-0", className)}
        decoding="async"
        loading="lazy"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={clsx("shrink-0", className)}
    />
  );
}
