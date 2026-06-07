import type {
  ContactSubmissionPayload,
  ContactSubmissionResponse,
  HomepageApiResponse,
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

export function getHomepageContent(): Promise<HomepageApiResponse> {
  return fetchApi<HomepageApiResponse>("/api/v1/homepage");
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
