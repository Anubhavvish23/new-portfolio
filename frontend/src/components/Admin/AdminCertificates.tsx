import React, { useState } from 'react';
import { useCertificates } from '@/hooks/useCertificates';
import { Certificate } from '@/types';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const AdminCertificates: React.FC = () => {
  const { certificates, loading, addCertificate, updateCertificate, deleteCertificate } = useCertificates();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    issuingOrg: '',
    date: '',
    image: '',
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      issuingOrg: '',
      date: '',
      image: '',
    });
    setCurrentCertificate(null);
    setIsEditing(false);
  };

  const handleEdit = (certificate: Certificate) => {
    setCurrentCertificate(certificate);
    setFormData({
      id: certificate.id,
      title: certificate.title,
      issuingOrg: certificate.issuingOrg,
      date: certificate.date,
      image: certificate.image,
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuingOrg || !formData.date || !formData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCertificate: Certificate = {
      id: formData.id || `certificate-${Date.now()}`,
      title: formData.title,
      issuingOrg: formData.issuingOrg,
      date: formData.date,
      image: formData.image,
      createdAt: currentCertificate?.createdAt || new Date().toISOString(),
    };

    if (isEditing && currentCertificate) {
      updateCertificate(newCertificate);
    } else {
      addCertificate(newCertificate);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      deleteCertificate(id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:w-2/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {certificates.length > 0 ? 'All Certificates' : 'No Certificates Yet'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg truncate">{certificate.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">
                    {certificate.issuingOrg}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    {new Date(certificate.date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(certificate)}
                      className="text-sm text-purple-light hover:text-neon-blue transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(certificate.id)}
                      className="text-sm text-red-400 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
          </h2>
          
          <form onSubmit={handleSubmit} className="glass-card p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Certificate title"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="issuingOrg" className="block text-sm font-medium mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                id="issuingOrg"
                name="issuingOrg"
                value={formData.issuingOrg}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Organization name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date of Issue *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 glass hover:bg-foreground/10 transition-all"
              >
                {isEditing ? 'Cancel' : 'Reset'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 glass hover:bg-purple-dark/20 transition-all"
              >
                {isEditing ? 'Update Certificate' : 'Add Certificate'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCertificates;
