
import React from 'react';
import { motion } from 'framer-motion';
import { AboutMe } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Heart } from 'lucide-react';

interface AboutMeSectionProps {
  aboutMe: AboutMe | null;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ aboutMe }) => {
  if (!aboutMe) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-dark/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-light to-neon-blue mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Profile Image */}
          <motion.div 
            className="lg:col-span-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-light to-neon-blue blur-lg opacity-50 -m-2" />
              <img 
                src={aboutMe.profileImage} 
                alt="Profile" 
                className="rounded-2xl w-full h-auto object-cover relative z-10 glass-card shadow-xl"
                style={{ maxWidth: "320px" }}
              />
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:col-span-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Headline and Bio */}
            <motion.div variants={item} className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-gradient">{aboutMe.headline}</h3>
              <p className="text-foreground/80 leading-relaxed">{aboutMe.bio}</p>
            </motion.div>
            
            {/* Skills */}
            <motion.div variants={item} className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {aboutMe.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="outline" className="glass-card px-3 py-1 text-sm">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Experience */}
            <motion.div variants={item} className="mb-8">
              <div className="flex items-center mb-3">
                <Briefcase className="mr-2 text-neon-blue" size={20} />
                <h4 className="text-xl font-semibold">Experience</h4>
              </div>
              <div className="space-y-4">
                {aboutMe.experience.map((exp) => (
                  <motion.div
                    key={exp.id}
                    className="glass-card p-4 rounded-lg"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h5 className="font-medium">{exp.position}</h5>
                    <p className="text-sm text-foreground/70">{exp.company}</p>
                    <p className="text-xs text-foreground/60">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Education */}
            <motion.div variants={item} className="mb-8">
              <div className="flex items-center mb-3">
                <GraduationCap className="mr-2 text-purple-light" size={20} />
                <h4 className="text-xl font-semibold">Education</h4>
              </div>
              <div className="space-y-4">
                {aboutMe.education.map((edu) => (
                  <motion.div
                    key={edu.id}
                    className="glass-card p-4 rounded-lg"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h5 className="font-medium">{edu.degree}</h5>
                    <p className="text-sm text-foreground/70">{edu.institution}</p>
                    <p className="text-xs text-foreground/60">{edu.year}</p>
                    {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Interests */}
            <motion.div variants={item}>
              <div className="flex items-center mb-3">
                <Heart className="mr-2 text-red-400" size={20} />
                <h4 className="text-xl font-semibold">Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutMe.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="bg-foreground/10 hover:bg-foreground/20 text-foreground px-3 py-1 text-sm">
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
