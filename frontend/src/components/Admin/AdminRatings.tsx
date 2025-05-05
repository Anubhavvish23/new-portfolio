
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import storageService from '@/services/storageService';
import { Rating } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AdminRatings: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = () => {
    const ratings = storageService.getRatings();
    ratings.sort((a, b) => b.createdAt - a.createdAt);
    setRatings(ratings);
    setAverageRating(storageService.getAverageRating());
  };

  const handleDeleteRating = (id: string) => {
    storageService.deleteRating(id);
    loadRatings();
    
    toast({
      title: "Rating Deleted",
      description: "The rating has been removed successfully",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <h2 className="text-xl font-bold mb-2">Rating Statistics</h2>
        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold mr-3">{averageRating.toFixed(1)}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
              // Calculate partial fill for the last star
              const fill = Math.min(Math.max(averageRating - (star - 1), 0), 1);
              
              return (
                <div key={star} className="relative">
                  <Star 
                    size={24} 
                    className="text-gray-300" 
                  />
                  {fill > 0 && (
                    <div className="absolute top-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                      <Star 
                        size={24} 
                        fill="#FFD700" 
                        color="#FFD700" 
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="ml-3 text-sm text-foreground/70">({ratings.length} ratings)</div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <motion.div
            key={rating.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < rating.score ? "#FFD700" : "transparent"}
                      color={i < rating.score ? "#FFD700" : "currentColor"}
                    />
                  ))}
                </div>
                {rating.comment && (
                  <p className="text-sm mb-2">{rating.comment}</p>
                )}
                <p className="text-xs text-foreground/60">{formatDate(rating.createdAt)}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteRating(rating.id)}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        ))}
        
        {ratings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-foreground/70"
          >
            No ratings yet
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminRatings;
