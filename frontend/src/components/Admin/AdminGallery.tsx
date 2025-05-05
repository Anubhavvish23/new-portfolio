import React, { useState } from 'react';
import { useGallery } from '@/hooks/useGallery';
import { GalleryItem } from '@/types';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const AdminGallery: React.FC = () => {
  const { galleryItems, loading, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    category: '',
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      image: '',
      category: '',
    });
    setCurrentItem(null);
    setIsEditing(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setCurrentItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      description: item.description || '',
      image: item.image,
      category: item.category || '',
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newItem: GalleryItem = {
      id: formData.id || `gallery-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      createdAt: currentItem?.createdAt || new Date().toISOString(),
    };

    if (isEditing && currentItem) {
      updateGalleryItem(newItem);
    } else {
      addGalleryItem(newItem);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      deleteGalleryItem(id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:w-2/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {galleryItems.length > 0 ? 'All Gallery Items' : 'No Gallery Items Yet'}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="h-36 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm truncate">{item.title}</h3>
                      {item.category && (
                        <span className="text-xs text-foreground/60">{item.category}</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-xs text-purple-light hover:text-neon-blue transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-red-400 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h2>
          
          <form onSubmit={handleSubmit} className="glass-card p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Item title"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Brief description"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category (optional)
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Events, Achievements, etc."
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 glass hover:bg-foreground/10 transition-all"
              >
                {isEditing ? 'Cancel' : 'Reset'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 glass hover:bg-purple-dark/20 transition-all"
              >
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminGallery;
