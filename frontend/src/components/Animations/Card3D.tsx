
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

const Card3D: React.FC<Card3DProps> = ({ children, className = '', depth = 15 }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    const rotateY = ((x - centerX) / centerX) * depth;
    const rotateX = -((y - centerY) / centerY) * depth;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`transition-transform perspective-1000 ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
      animate={{ 
        rotateY: rotateY, 
        rotateX: rotateX,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at ${rotateY > 0 ? '70%' : '30%'} ${rotateX > 0 ? '70%' : '30%'}, 
              rgba(255,255,255,0.1) 0%, 
              rgba(255,255,255,0) 60%
            )
          `,
          transform: 'translateZ(2px)',
        }}
      />
    </motion.div>
  );
};

export default Card3D;
