
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import ContactSection from '@/components/Home/ContactSection';
import RatingWidget from '@/components/Rating/RatingWidget';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <MainLayout>
      <div 
        className="relative min-h-screen overflow-hidden" 
        onMouseMove={handleMouseMove}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-light/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-neon-blue/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-[30%] w-32 h-32 rounded-full bg-purple-light/10 blur-xl"
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, -20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Interactive cursor follow element */}
        <motion.div
          className="hidden md:block absolute w-60 h-60 rounded-full bg-gradient-to-r from-purple-light/5 to-neon-blue/5 blur-3xl pointer-events-none"
          animate={{
            x: cursorPosition.x - 120,
            y: cursorPosition.y - 120,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 0.5,
          }}
        />

        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-bold"
              >
                Let's <span className="text-gradient">Connect</span>
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-purple-light to-neon-blue mt-3"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-6 text-foreground/80 max-w-2xl text-lg"
              >
                I'm always interested in new opportunities, collaborations, or just a friendly chat. 
                Drop me a message and I'll get back to you as soon as possible.
              </motion.p>

              {/* Animated arrow pointing down */}
              <motion.div 
                className="mt-10 flex justify-center md:justify-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop" 
                  }}
                >
                  <svg 
                    className="h-8 w-8 text-purple-light" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactSection />
              <RatingWidget />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Contact;
