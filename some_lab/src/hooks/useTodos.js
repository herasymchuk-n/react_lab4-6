import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [allTodos, setAllTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const skip = (currentPage - 1) * limitPerPage;
      const res = await axios.get(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
      setTodos(res.data.todos);
      setAllTodos(res.data.todos);
      setTotalTodos(res.data.total);
      setError(null);
    } catch {
      setError("Failed to fetch todos");
    }
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setTodos(allTodos);
    } else {
      setTodos(
        allTodos.filter(todo =>
          todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allTodos]);

  const addTodo = useCallback(
    (todoText) => {
      const newTodo = {
        id: Date.now(),
        todo: todoText,
        completed: false,
        userId: 1,
      };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setAllTodos((prevTodos) => [newTodo, ...prevTodos]);
      setTotalTodos((prev) => prev + 1);
    },
    []
  );

  const toggleTodo = useCallback(
    async (id) => {
      setTodos(prev =>
        prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );
      setAllTodos(prev =>
        prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );
      if (typeof id === "number" && id <= 254) {
        try {
          const todoToToggle = todos.find((t) => t.id === id);
          await axios.put(`${API_URL}/${id}`, {
            completed: !todoToToggle.completed,
          });
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id) => {
      setTodos(prev => prev.filter(t => t.id !== id));
      setAllTodos(prev => prev.filter(t => t.id !== id));
      setTotalTodos(prev => prev - 1);
      if (typeof id === "number" && id <= 254) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      }
    },
    []
  );

  const editTodoTitle = useCallback(
    async (id, newTitle) => {
      const oldTodo = todos.find(t => t.id === id);
      setTodos(prev =>
        prev.map(t => t.id === id ? { ...t, todo: newTitle } : t)
      );
      setAllTodos(prev =>
        prev.map(t => t.id === id ? { ...t, todo: newTitle } : t)
      );
      if (typeof id === "number" && id <= 254) {
        try {
          await axios.put(`${API_URL}/${id}`, { todo: newTitle });
          setError(null);
        } catch (err) {
          setTodos(prev =>
            prev.map(t => t.id === id ? oldTodo : t)
          );
          setAllTodos(prev =>
            prev.map(t => t.id === id ? oldTodo : t)
          );
          setError(err.message);
        }
      }
    },
    [todos]
  );

  const goToNextPage = () => setCurrentPage(prev => prev + 1);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return {
    todos,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    setLimitPerPage,
    goToNextPage,
    goToPrevPage,
  };
}
