import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useProjects } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectFilters from '@/components/Projects/ProjectFilters';

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');

  // Extract unique categories from projects
  const categories = useMemo(() => {
    if (!projects.length) return [];
    
    const allCategories = projects
      .map(project => project.category || 'Other')
      .filter((category, index, self) => self.indexOf(category) === index);
      
    return allCategories;
  }, [projects]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    
    return projects.filter(project => 
      (project.category || 'Other') === activeCategory
    );
  }, [projects, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      }
    }
  };

  return (
    <MainLayout>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Projects
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple-light to-neon-blue mt-3"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-foreground/80 max-w-2xl"
            >
              A showcase of my recent projects and technical explorations.
            </motion.p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading projects...</div>
          ) : (
            <>
              {categories.length > 0 && (
                <ProjectFilters 
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              )}
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Array.isArray(filteredProjects) && filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id} 
                    variants={itemVariants}
                    className="glass-card group overflow-hidden"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        {project.category && (
                          <span className="text-xs px-2 py-1 glass text-purple-light">{project.category}</span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
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
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
          
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/70">
                {activeCategory === 'all' 
                  ? 'No projects available yet.' 
                  : `No projects found in the "${activeCategory}" category.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Projects;
