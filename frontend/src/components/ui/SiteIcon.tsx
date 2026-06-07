import Image from "next/image";
import clsx from "clsx";

interface SiteIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function SiteIcon({ src, alt, size = 28, className }: SiteIconProps) {
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
