
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TypingText from '@/components/Animations/TypingText';
import ParallaxSection from '@/components/Animations/ParallaxSection';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center">
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxSection offset={30}>
          <motion.div 
            className="absolute top-1/4 right-[20%] w-64 h-64 rounded-full bg-purple-light/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </ParallaxSection>
        <ParallaxSection offset={40}>
          <motion.div 
            className="absolute bottom-1/3 left-[15%] w-72 h-72 rounded-full bg-neon-blue/10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </ParallaxSection>
        <ParallaxSection offset={20}>
          <motion.div 
            className="absolute top-1/2 right-[40%] w-48 h-48 rounded-full bg-neon-sky/5 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
        </ParallaxSection>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="block">I'm a</span>
              <TypingText 
                texts={["Full Stack Developer", "Generative AI Engineer ", "Problem Solver"]} 
                className="text-gradient block"
                typingSpeed={80}
              />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/80 mb-8"
            >
              Me?<br></br>
              Lines of code weave through circuits of curiosity, merging AI's whispers with web's pulse, every bug a riddle cracking open deeper innovation, Certificates stack like neural layers, deployments bloom like midnight scripts.<br></br>


            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/projects" className="glass-card px-6 py-3 hover:bg-purple-dark/20 transition-all">
                View Projects
              </Link>
              <Link to="/contact" className="glass-card px-6 py-3 hover:bg-purple-dark/20 transition-all">
                Get in Touch
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="md:w-1/2 mt-10 md:mt-0 relative"
          >
            <div className="relative">
              <div className="w-full h-64 md:h-96 glass-card overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  alt="Hero Image"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              
              <motion.div 
                initial={{ x: -20, y: -20, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-5 -left-5 w-24 h-24 glass-card flex items-center justify-center"
              >
                <span className="text-4xl text-gradient font-bold">10+</span>
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, y: 20, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 glass-card px-4 py-3"
              >
                <p className="text-sm font-medium">Creative Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs text-foreground/50 mb-2">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-foreground/30 rounded-full flex justify-center pt-1"
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}  
              className="w-1 h-1.5 bg-purple-light rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
