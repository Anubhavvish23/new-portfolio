
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Certificate } from '@/types';

interface CertificateShowcaseProps {
  certificates: Certificate[];
}

const CertificateShowcase: React.FC<CertificateShowcaseProps> = ({ certificates }) => {
  const displayCertificates = certificates.slice(0, 4);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-dark/20 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold"
            >
              Certificates & Achievements
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
              to="/certificates" 
              className="inline-flex items-center text-sm text-foreground/80 hover:text-purple-light transition-all mt-4 md:mt-0"
            >
              View All Certificates
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={certificate.image} 
                  alt={certificate.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-base mb-1 line-clamp-1">{certificate.title}</h3>
                <p className="text-xs text-foreground/70 mb-2">
                  {certificate.issuingOrg} • {new Date(certificate.date).toLocaleDateString()}
                </p>
                <Link
                  to={`/certificates/${certificate.id}`}
                  className="text-xs text-purple-light hover:text-neon-blue transition-colors inline-flex items-center"
                >
                  View Certificate
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {displayCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70">No certificates available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificateShowcase;
