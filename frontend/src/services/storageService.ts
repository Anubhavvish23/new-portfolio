import { Project, Certificate, GalleryItem, User, Rating, AboutMe } from '@/types';
import * as api from './api';

// Initial sample data for first-time users
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js. Features include product filtering, user authentication, cart functionality, and payment processing.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/username/ecommerce',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather and forecasts based on location. Uses the OpenWeatherMap API for real-time data.',
    techStack: ['JavaScript', 'API', 'CSS', 'HTML'],
    liveLink: 'https://example.com/weather',
    githubLink: 'https://github.com/username/weather',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const sampleCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    issuingOrg: 'Tech Academy',
    date: '2023-08-15',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Advanced React & Redux',
    issuingOrg: 'Frontend Masters',
    date: '2023-05-20',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const sampleGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Speaking at the annual tech conference',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    category: 'Events',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Team Hackathon',
    description: 'First place at the regional hackathon',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    category: 'Achievements',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const sampleRatings: Rating[] = [
  {
    id: '1',
    score: 5,
    comment: "Wow, great portfolio!",
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    score: 4,
    comment: "Very nice design, but could use more projects",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const sampleAboutMe: AboutMe = {
  id: '1',
  headline: 'Full Stack Developer & UI/UX Enthusiast',
  bio: 'I am a passionate Full Stack Developer with 5+ years of experience building modern web applications. Specializing in React.js and Node.js, I create responsive, user-friendly interfaces and robust backend systems. I believe in clean code, continuous learning, and delivering exceptional user experiences.',
  skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'UI/UX Design', 'Framer Motion'],
  education: [
    {
      id: '1',
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      year: '2019 - 2021',
      description: 'Focused on advanced web technologies and human-computer interaction'
    },
    {
      id: '2',
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'State University',
      year: '2015 - 2019',
      description: 'Dean\'s List, Senior project: AI-powered content management system'
    }
  ],
  experience: [
    {
      id: '1',
      position: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      startDate: 'Jan 2022',
      current: true,
      description: 'Leading development of the company\'s flagship SaaS product. Managing a team of 5 developers, implementing CI/CD pipelines, and reducing application load time by 40%.'
    },
    {
      id: '2',
      position: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      current: false,
      description: 'Developed and maintained multiple client websites and web applications. Implemented responsive designs and optimized database queries, resulting in 30% faster page loads.'
    }
  ],
  interests: ['Open Source', 'AI & Machine Learning', 'Game Development', 'Photography', 'Hiking'],
  profileImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Helper class for managing localStorage
class StorageService {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await api.getProjects();
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async addProject(project: Project): Promise<Project[]> {
    try {
      await api.createProject(project);
      return this.getProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      return [];
    }
  }

  async updateProject(project: Project): Promise<Project[]> {
    try {
      await api.updateProject(project.id, project);
      return this.getProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      return [];
    }
  }

  async deleteProject(id: string): Promise<Project[]> {
    try {
      await api.deleteProject(id);
      return this.getProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      return [];
    }
  }

  // Certificates
  getCertificates(): Certificate[] {
    const certificates = localStorage.getItem('portfolio_certificates');
    return certificates ? JSON.parse(certificates) : sampleCertificates;
  }

  saveCertificates(certificates: Certificate[]): void {
    localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
  }

  addCertificate(certificate: Certificate): Certificate[] {
    const certificates = this.getCertificates();
    certificates.push(certificate);
    this.saveCertificates(certificates);
    return certificates;
  }

  updateCertificate(certificate: Certificate): Certificate[] {
    const certificates = this.getCertificates();
    const index = certificates.findIndex(c => c.id === certificate.id);
    if (index !== -1) {
      certificates[index] = certificate;
      this.saveCertificates(certificates);
    }
    return certificates;
  }

  deleteCertificate(id: string): Certificate[] {
    const certificates = this.getCertificates();
    const filteredCertificates = certificates.filter(c => c.id !== id);
    this.saveCertificates(filteredCertificates);
    return filteredCertificates;
  }

  // Gallery
  getGalleryItems(): GalleryItem[] {
    const galleryItems = localStorage.getItem('portfolio_gallery');
    return galleryItems ? JSON.parse(galleryItems) : sampleGalleryItems;
  }

  saveGalleryItems(galleryItems: GalleryItem[]): void {
    localStorage.setItem('portfolio_gallery', JSON.stringify(galleryItems));
  }

  addGalleryItem(item: GalleryItem): GalleryItem[] {
    const galleryItems = this.getGalleryItems();
    galleryItems.push(item);
    this.saveGalleryItems(galleryItems);
    return galleryItems;
  }

  updateGalleryItem(item: GalleryItem): GalleryItem[] {
    const galleryItems = this.getGalleryItems();
    const index = galleryItems.findIndex(g => g.id === item.id);
    if (index !== -1) {
      galleryItems[index] = item;
      this.saveGalleryItems(galleryItems);
    }
    return galleryItems;
  }

  deleteGalleryItem(id: string): GalleryItem[] {
    const galleryItems = this.getGalleryItems();
    const filteredItems = galleryItems.filter(g => g.id !== id);
    this.saveGalleryItems(filteredItems);
    return filteredItems;
  }

  // About Me
  async getAboutMe(): Promise<AboutMe | null> {
    try {
      const response = await api.getAboutMe();
      return response.data;
    } catch (error) {
      console.error('Error fetching about me:', error);
      return null;
    }
  }

  async saveAboutMe(aboutMe: AboutMe): Promise<AboutMe | null> {
    try {
      const response = await api.updateAboutMe(aboutMe);
      return response.data;
    } catch (error) {
      console.error('Error saving about me:', error);
      return null;
    }
  }

  // Ratings
  getRatings(): Rating[] {
    const ratings = localStorage.getItem('portfolio_ratings');
    return ratings ? JSON.parse(ratings) : sampleRatings;
  }

  saveRatings(ratings: Rating[]): void {
    localStorage.setItem('portfolio_ratings', JSON.stringify(ratings));
  }

  addRating(rating: Rating): Rating[] {
    const ratings = this.getRatings();
    ratings.push(rating);
    this.saveRatings(ratings);
    return ratings;
  }

  deleteRating(id: string): Rating[] {
    const ratings = this.getRatings();
    const filteredRatings = ratings.filter(r => r.id !== id);
    this.saveRatings(filteredRatings);
    return filteredRatings;
  }

  getAverageRating(): number {
    const ratings = this.getRatings();
    if (ratings.length === 0) return 0;
    
    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return sum / ratings.length;
  }

  // User/Auth
  getUser(): User | null {
    const user = localStorage.getItem('portfolio_user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  }

  // Check admin login
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await api.login(username, password);
      const { token, ...user } = response.data;
      localStorage.setItem('portfolio_token', token);
      localStorage.setItem('portfolio_user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('portfolio_token');
  }
}

export default new StorageService();
