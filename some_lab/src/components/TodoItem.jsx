import React, { useState, useEffect } from 'react';

export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.todo);

  useEffect(() => {
    setEditTitle(todo.todo);
  }, [todo.todo]);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  return (
    <li style={{ marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            style={{ marginLeft: '10px' }}
          />
          <button onClick={handleSave} style={{ marginLeft: '5px' }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '5px' }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              marginLeft: '10px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'black',
            }}
          >
            {todo.todo}
          </span>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>
            Edit
          </button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </li>
  );
}
