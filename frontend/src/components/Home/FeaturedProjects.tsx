
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import Card3D from '@/components/Animations/Card3D';
import CounterAnimation from '@/components/Animations/CounterAnimation';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  // Get up to 3 featured projects, or just the first 3 if none are marked as featured
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 3) || 
    projects.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold"
            >
              Featured Projects
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple-light to-neon-blue mt-3"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center text-sm text-foreground/80 hover:text-purple-light transition-all mt-4 md:mt-0"
            >
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
        
        {/* Project Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 glass-card p-6">
          <div className="text-center">
            <CounterAnimation 
              end={10} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-gradient"
            />
            <p className="text-sm text-foreground/70 mt-2">Projects</p>
          </div>
          <div className="text-center">
            <CounterAnimation 
              end={1200} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-gradient"
            />
            <p className="text-sm text-foreground/70 mt-2">Hours Coded</p>
          </div>
          <div className="text-center">
            <CounterAnimation 
              end={10} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-gradient"
            />
            <p className="text-sm text-foreground/70 mt-2">Technologies</p>
          </div>
          <div className="text-center">
            <CounterAnimation 
              end={98} 
              suffix="%" 
              className="text-3xl md:text-4xl font-bold text-gradient"
            />
            <p className="text-sm text-foreground/70 mt-2">Project Learning</p>
          </div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
            >
              <Card3D className="h-full overflow-hidden">
                <div className="glass-card h-full">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 glass"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground/70 hover:text-purple-light transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground/70 hover:text-purple-light transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      
                      <Link 
                        to={`/projects/${project.id}`}
                        className="text-sm text-purple-light hover:text-neon-blue transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
        
        {featuredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70">No projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
