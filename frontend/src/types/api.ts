export interface CarouselImage {
  id: number;
  title: string;
  image: string | null;
}

export interface Initiative {
  id: number;
  title: string;
  description: string;
  images: string[];
  overlay_image: string | null;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  project_images: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  photo: string | null;
}

export interface SiteConfig {
  youtube_video_id: string | null;
  site_name: string;
  tagline: string;
  whatsapp_number: string | null;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  contact: string;
  message: string;
}

export interface ContactSubmissionResponse {
  message?: string;
  errors?: string[];
}
