import React from 'react';  

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          marginLeft: '10px',
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black',
        }}
      >
        {todo.todo}
      </span>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </li>
  );
}
