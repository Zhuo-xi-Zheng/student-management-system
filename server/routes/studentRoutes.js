import express from 'express';
import { 
  getAllStudents, 
  getStudentById, 
  addStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';

const router = express.Router();

// 学生路由
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;