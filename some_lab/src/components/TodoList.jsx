import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAdd = () => {
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{ width: '70%', padding: '8px' }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: '8px 12px', marginLeft: '10px' }}
        >
          Add
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.length === 0 && !isLoading && <p>No todos found.</p>}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
