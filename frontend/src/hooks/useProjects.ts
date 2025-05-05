import { useState, useEffect } from 'react';
import { Project } from '@/types';
import storageService from '@/services/storageService';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await storageService.getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (project: Project) => {
    await storageService.addProject(project);
    fetchProjects();
  };

  const updateProject = async (project: Project) => {
    await storageService.updateProject(project);
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    await storageService.deleteProject(id);
    fetchProjects();
  };

  return { projects, loading, error, addProject, updateProject, deleteProject };
}; 