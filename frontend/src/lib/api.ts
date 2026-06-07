import type {
  CarouselImage,
  ContactSubmissionPayload,
  ContactSubmissionResponse,
  Initiative,
  Project,
  SiteConfig,
  TeamMember,
} from "@/types/api";

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }

  return process.env.RAILS_API_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getCarouselImages(): Promise<CarouselImage[]> {
  return fetchApi<CarouselImage[]>("/api/v1/carousel_images");
}

export function getInitiatives(): Promise<Initiative[]> {
  return fetchApi<Initiative[]>("/api/v1/initiatives");
}

export function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>("/api/v1/projects");
}

export function getTeamMembers(): Promise<TeamMember[]> {
  return fetchApi<TeamMember[]>("/api/v1/team_members");
}

export function getSiteConfig(): Promise<SiteConfig> {
  return fetchApi<SiteConfig>("/api/v1/site_config");
}

export async function submitContact(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  const baseUrl = typeof window !== "undefined" ? "" : getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/v1/contact_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ contact_submission: payload }),
  });

  const data = (await response.json()) as ContactSubmissionResponse;

  if (!response.ok) {
    return { errors: data.errors || ["Something went wrong. Please try again."] };
  }

  return data;
}
