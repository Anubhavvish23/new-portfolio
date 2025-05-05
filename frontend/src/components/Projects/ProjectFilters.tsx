
import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-purple-light" />
        <span className="text-sm font-medium">Filter projects</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full ${
            activeCategory === 'all' 
              ? 'bg-purple-light/20 text-purple-light' 
              : 'hover:bg-purple-light/10'
          }`}
          onClick={() => onCategoryChange('all')}
        >
          All
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={`rounded-full ${
              activeCategory === category 
                ? 'bg-purple-light/20 text-purple-light' 
                : 'hover:bg-purple-light/10'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;
