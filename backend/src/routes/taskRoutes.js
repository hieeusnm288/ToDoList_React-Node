import express from 'express';
import { getAllTasks, createTask, deleteTask, updateTask } from '../controller/taskControllers.js';

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;