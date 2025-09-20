import * as todoService from '../services/todoService.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user.id);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await todoService.createTodo(req.user.id, title);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.user.id, req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(err.message === 'Todo not found' ? 404 : 500).json({ msg: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await todoService.updateTodo(req.user.id, req.params.id, { title, completed });
    res.json(todo);
  } catch (err) {
    res.status(err.message === 'Todo not found' ? 404 : 500).json({ msg: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.user.id, req.params.id);
    res.json({ msg: 'Todo deleted' });
  } catch (err) {
    res.status(err.message === 'Todo not found' ? 404 : 500).json({ msg: err.message });
  }
};