
import { useState, useEffect } from 'react';
import { Project, Certificate, GalleryItem } from '@/types';
import storageService from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const data = storageService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addProject = (project: Project) => {
    try {
      const updatedProjects = storageService.addProject(project);
      setProjects(updatedProjects);
      toast({
        title: "Success!",
        description: "Project added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProject = (project: Project) => {
    try {
      const updatedProjects = storageService.updateProject(project);
      setProjects(updatedProjects);
      toast({
        title: "Success!",
        description: "Project updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProject = (id: string) => {
    try {
      const updatedProjects = storageService.deleteProject(id);
      setProjects(updatedProjects);
      toast({
        title: "Success!",
        description: "Project deleted successfully",
      });
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
  };
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const data = storageService.getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error loading certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addCertificate = (certificate: Certificate) => {
    try {
      const updatedCertificates = storageService.addCertificate(certificate);
      setCertificates(updatedCertificates);
      toast({
        title: "Success!",
        description: "Certificate added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding certificate:', error);
      toast({
        title: "Error",
        description: "Failed to add certificate",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateCertificate = (certificate: Certificate) => {
    try {
      const updatedCertificates = storageService.updateCertificate(certificate);
      setCertificates(updatedCertificates);
      toast({
        title: "Success!",
        description: "Certificate updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating certificate:', error);
      toast({
        title: "Error",
        description: "Failed to update certificate",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteCertificate = (id: string) => {
    try {
      const updatedCertificates = storageService.deleteCertificate(id);
      setCertificates(updatedCertificates);
      toast({
        title: "Success!",
        description: "Certificate deleted successfully",
      });
      return true;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    certificates,
    loading,
    addCertificate,
    updateCertificate,
    deleteCertificate,
  };
}

export function useGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const data = storageService.getGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error loading gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addGalleryItem = (item: GalleryItem) => {
    try {
      const updatedItems = storageService.addGalleryItem(item);
      setGalleryItems(updatedItems);
      toast({
        title: "Success!",
        description: "Gallery item added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to add gallery item",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateGalleryItem = (item: GalleryItem) => {
    try {
      const updatedItems = storageService.updateGalleryItem(item);
      setGalleryItems(updatedItems);
      toast({
        title: "Success!",
        description: "Gallery item updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteGalleryItem = (id: string) => {
    try {
      const updatedItems = storageService.deleteGalleryItem(id);
      setGalleryItems(updatedItems);
      toast({
        title: "Success!",
        description: "Gallery item deleted successfully",
      });
      return true;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    galleryItems,
    loading,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  };
}
