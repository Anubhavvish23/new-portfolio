import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useGallery } from '@/hooks/useGallery';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC = () => {
  const { galleryItems, loading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  // Extract unique categories
  const categories = ['all', ...new Set(galleryItems.map(item => item.category || 'Other').filter(Boolean))];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openImage = (image: string) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <MainLayout>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Gallery
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple-light to-neon-blue mt-3"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-foreground/80 max-w-2xl"
            >
              A collection of images showcasing events, achievements, and moments.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm ${
                  selectedCategory === category
                    ? 'glass-card'
                    : 'text-foreground/70 hover:text-foreground transition-colors'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
          
          {loading ? (
            <div className="text-center py-12">Loading gallery...</div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                    layout
                    className="glass-card overflow-hidden cursor-pointer group"
                    onClick={() => openImage(item.image)}
                  >
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.category && (
                        <p className="text-xs text-foreground/60 mt-1">{item.category}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/70">
                {selectedCategory === 'all' 
                  ? 'No gallery items available yet.'
                  : `No items in the '${selectedCategory}' category.`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
            className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
          >
            <button 
              className="absolute top-6 right-6 text-foreground/70 hover:text-foreground/100"
              onClick={closeImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain glass-card p-2"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Gallery;
