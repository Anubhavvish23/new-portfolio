import { useState, useEffect } from 'react';
import { AboutMe } from '@/types';
import storageService from '@/services/storageService';

export const useAboutMe = () => {
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutMe = async () => {
    setLoading(true);
    try {
      const data = await storageService.getAboutMe();
      setAboutMe(data);
    } catch (err) {
      setError('Failed to fetch about me data');
      console.error('Error fetching about me:', err);
      setAboutMe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const saveAboutMe = async (aboutMeData: AboutMe) => {
    const saved = await storageService.saveAboutMe(aboutMeData);
    setAboutMe(saved);
    return saved;
  };

  return { aboutMe, loading, error, saveAboutMe };
}; 