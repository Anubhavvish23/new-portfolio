export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  image: string;
  featured?: boolean;
  createdAt: string;
  updatedAt?: string;
  category?: string; // Added category for filtering
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrg: string;
  date: string;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category?: string;
  createdAt: string;
  updatedAt?: string;
}

export type User = {
  username: string;
  isAdmin: boolean;
};

export interface Rating {
  id: string;
  score: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AboutMe {
  id: string;
  headline: string;
  bio: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  interests: string[];
  profileImage: string;
  resumeFile?: string; // Added resume file URL
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
