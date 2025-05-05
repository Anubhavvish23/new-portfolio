import { useState, useEffect } from 'react';
import { Certificate } from '@/types';
import storageService from '@/services/storageService';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await storageService.getCertificates();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch certificates');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const addCertificate = async (certificate: Certificate) => {
    await storageService.addCertificate(certificate);
    fetchCertificates();
  };

  const updateCertificate = async (certificate: Certificate) => {
    await storageService.updateCertificate(certificate);
    fetchCertificates();
  };

  const deleteCertificate = async (id: string) => {
    await storageService.deleteCertificate(id);
    fetchCertificates();
  };

  return { certificates, loading, error, addCertificate, updateCertificate, deleteCertificate };
}; 