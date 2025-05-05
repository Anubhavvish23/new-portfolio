import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router; 