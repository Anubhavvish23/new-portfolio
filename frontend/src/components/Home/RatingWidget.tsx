import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const RatingWidget: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Implement API call to save rating
      toast({
        title: "Thank you!",
        description: "Your rating has been submitted successfully.",
      });
      setRating(0);
      setFeedback('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl text-center">Rate My Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`h-8 w-8 cursor-pointer ${
                  (hoveredRating || rating) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              />
            </motion.div>
          ))}
        </div>
        
        <Textarea
          placeholder="Share your feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-4"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!rating}
          className="w-full"
        >
          Submit Rating
        </Button>
      </CardContent>
    </Card>
  );
};

export default RatingWidget; 