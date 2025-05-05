import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import storageService from '@/services/storageService';
import { Rating } from '@/types';

const RatingWidget: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRatingClick = (score: number) => {
    setRating(score);
  };

  const handleRatingHover = (score: number) => {
    setHoveredRating(score);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting",
        variant: "destructive",
      });
      return;
    }

    const newRating: Rating = {
      id: uuidv4(),
      score: rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    storageService.addRating(newRating);
    setIsSubmitted(true);
    
    toast({
      title: "Thank You!",
      description: "Your rating has been submitted",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-6 text-center"
      >
        <h3 className="text-xl font-medium mb-2">Thank You!</h3>
        <p>Your feedback has been recorded.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-medium mb-4">Rate My Portfolio</h3>
      
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleRatingHover(star)}
            onMouseLeave={handleRatingLeave}
            className="mx-1"
          >
            <Star 
              size={32} 
              fill={(hoveredRating || rating) >= star ? "#FFD700" : "transparent"} 
              color={(hoveredRating || rating) >= star ? "#FFD700" : "currentColor"}
              strokeWidth={1.5}
            />
          </motion.button>
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-2">Leave a comment (optional):</label>
        <Input
          placeholder="What did you think about this portfolio?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      
      <Button
        onClick={handleSubmit}
        className="w-full"
      >
        Submit Rating
      </Button>
    </motion.div>
  );
};

export default RatingWidget;
