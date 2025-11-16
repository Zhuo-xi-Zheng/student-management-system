import express from 'express';
import { 
  getAllTeachers, 
  getTeacherById, 
  addTeacher, 
  updateTeacher, 
  deleteTeacher 
} from '../controllers/teacherController.js';

const router = express.Router();

// 教师路由
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', addTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;