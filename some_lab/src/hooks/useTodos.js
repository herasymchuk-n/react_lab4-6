import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([]); 
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      todo: title,
      completed: false,
      userId: 1
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };


  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return { todos, deleteTodo, toggleTodo, addTodo };
}
