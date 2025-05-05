
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorHover, setCursorHover] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleLinkHover = () => setCursorVariant("text");
    const handleLinkLeave = () => setCursorVariant("default");
    
    window.addEventListener("mousemove", mouseMove);
    
    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [location.pathname]); // Re-run effect when location changes

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1,
    },
    text: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
      backgroundColor: "rgba(155, 135, 245, 0.1)",
      mixBlendMode: "difference" as any,
    }
  };

  const cursorDotVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1,
    },
    text: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.5,
      backgroundColor: "rgba(155, 135, 245, 0.8)",
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-dark/20">
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ 
          '--x': `${mousePosition.x}px`, 
          '--y': `${mousePosition.y}px`
        } as React.CSSProperties}
      />
      <motion.div
        className="custom-cursor-dot"
        variants={cursorDotVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 800, damping: 28, mass: 0.3 }}
        style={{ 
          '--x': `${mousePosition.x}px`, 
          '--y': `${mousePosition.y}px`
        } as React.CSSProperties}
      />

      <Navbar />
      
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="pt-20 min-h-[calc(100vh-180px)]"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default MainLayout;
