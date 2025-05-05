import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { useCertificates } from '@/hooks/useCertificates';
import { useGallery } from '@/hooks/useGallery';
import AdminProjects from './AdminProjects';
import AdminCertificates from './AdminCertificates';
import AdminGallery from './AdminGallery';
import AdminRatings from './AdminRatings';
import AdminAboutMe from './AdminAboutMe';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import storageService from '@/services/storageService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { projects, loading: projectsLoading } = useProjects();
  const { certificates, loading: certificatesLoading } = useCertificates();
  const { galleryItems, loading: galleryLoading } = useGallery();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ratings = storageService.getRatings();
  const aboutMe = storageService.getAboutMe();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'certificates', label: 'Certificates', count: certificates.length },
    { id: 'gallery', label: 'Gallery', count: galleryItems.length },
    { id: 'aboutme', label: 'About Me', count: aboutMe ? 1 : 0 },
    { id: 'ratings', label: 'Ratings', count: ratings.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/70">
              Welcome back, <span className="text-purple-light">{user?.username || 'Admin'}</span>
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleLogout}
            className="mt-4 lg:mt-0 px-4 py-2 glass hover:bg-purple-dark/20 transition-colors"
          >
            Logout
          </motion.button>
        </div>

        <div className="glass-card p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded-lg relative ${
                  activeTab === tab.id
                    ? 'glass-card'
                    : 'hover:bg-foreground/5 transition-colors'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs glass rounded-full">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-light to-neon-blue"
                    initial={false}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'certificates' && <AdminCertificates />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'aboutme' && <AdminAboutMe />}
            {activeTab === 'ratings' && <AdminRatings />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
