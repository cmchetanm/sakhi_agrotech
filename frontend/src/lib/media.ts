/** Convert absolute Rails blob URLs to same-origin paths proxied by Next.js. */
export function normalizeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const { pathname, search } = new URL(url);
    if (pathname.startsWith("/rails/")) {
      return `${pathname}${search}`;
    }
  } catch {
    if (url.startsWith("/rails/")) return url;
  }

  return url;
}

export function isRailsBlobUrl(url: string): boolean {
  return url.includes("/rails/active_storage");
}

/** Prefer bundled static images when API returns proxied Rails blobs (often unavailable in dev). */
export function preferStaticImage(
  url: string | null | undefined,
  fallback: string
): string {
  if (!url || isRailsBlobUrl(url)) return fallback;
  return url;
}
