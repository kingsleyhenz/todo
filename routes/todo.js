import express from 'express';
import auth from '../middleware/auth.js';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = express.Router();

router.get('/', auth, getTodos);
router.get('/:id', auth, getTodoById);
router.post('/', auth, createTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

export default router;