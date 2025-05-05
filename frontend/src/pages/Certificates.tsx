import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useCertificates } from '@/hooks/useCertificates';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Certificates: React.FC = () => {
  const { certificates, loading } = useCertificates();

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
              Certificates
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
              Professional certifications and achievements that showcase my expertise and continuous learning.
            </motion.p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading certificates...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{certificate.title}</h2>
                    <p className="text-sm text-foreground/70">
                      <span className="block">Issued by: {certificate.issuingOrg}</span>
                      <span className="block mt-1">Date: {new Date(certificate.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {!loading && certificates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/70">No certificates available yet.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Certificates;
