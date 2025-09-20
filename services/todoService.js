import Todo from '../models/todo.js';

export const getTodos = async (userId) => {
  return await Todo.find({ userId });
};

export const createTodo = async (userId, title) => {
  const todo = new Todo({ userId, title });
  return await todo.save();
};

export const getTodoById = async (userId, todoId) => {
  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) throw new Error('Todo not found');
  return todo;
};

export const updateTodo = async (userId, todoId, updates) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, userId },
    updates,
    { new: true }
  );
  if (!todo) throw new Error('Todo not found');
  return todo;
};

export const deleteTodo = async (userId, todoId) => {
  const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
  if (!todo) throw new Error('Todo not found');
  return todo;
};