import { useState, useEffect } from 'react';
import { GalleryItem } from '@/types';
import storageService from '@/services/storageService';

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await storageService.getGalleryItems();
      setGalleryItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch gallery items');
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const addGalleryItem = async (item: GalleryItem) => {
    await storageService.addGalleryItem(item);
    fetchGallery();
  };

  const updateGalleryItem = async (item: GalleryItem) => {
    await storageService.updateGalleryItem(item);
    fetchGallery();
  };

  const deleteGalleryItem = async (id: string) => {
    await storageService.deleteGalleryItem(id);
    fetchGallery();
  };

  return { galleryItems, loading, error, addGalleryItem, updateGalleryItem, deleteGalleryItem };
}; 