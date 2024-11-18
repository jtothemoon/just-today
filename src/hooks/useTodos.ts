// src/hooks/useTodos.ts
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { Todo } from '../types/todo';
import { STORAGE_KEY } from '../constants/storage';
import { Priority } from '../types/todo';

export const useTodos = () => {
  const { showToast } = useToast();

  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY.TODOS);
    if (saved) {
      const initialValue = JSON.parse(saved);
      return initialValue.map((todo: Omit<Todo, 'createdAt'> & { createdAt: string }) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.TODOS, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(async (content: string, priority: Priority) => {
    setActionLoading(true);
    try {
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: content.trim(),
        isCompleted: false,
        createdAt: new Date(),
        priority,
      };

      setTodos(prev => [...prev, todo]);
      showToast('할 일이 추가되었습니다.', 'success');
    } finally {
      setActionLoading(false);
    }
  }, [showToast]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => {
      const newTodos = prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      
      // 상태 업데이트 후에 토스트 표시
      const toggledTodo = newTodos.find(todo => todo.id === id);
      if (toggledTodo) {
        setTimeout(() => {
          showToast(
            toggledTodo.isCompleted ? '할 일이 완료되었습니다.' : '할 일이 미완료로 변경되었습니다.',
            'info'
          );
        }, 0);
      }
      
      return newTodos;
    });
  }, [showToast]);

  const updateTodo = useCallback((id: string, content: string) => {
    if (!content.trim()) return;

    setActionLoading(true);
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, content: content.trim() } : todo
        )
      );
      setEditingId(null);
      setEditingText('');
      showToast('할 일이 수정되었습니다.', 'success');
    } finally {
      setActionLoading(false);
    }
  }, [showToast]);

  const deleteTodo = useCallback((id: string) => {
    setActionLoading(true);
    try {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setDeleteId(null);
      showToast('할 일이 삭제되었습니다.', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [showToast]);

  const startEditing = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.content);
  }, []);

  const resetTodos = useCallback(() => {
    setActionLoading(true);
    try {
      setTodos([]);
      localStorage.removeItem(STORAGE_KEY.TODOS);
      showToast('새로운 하루가 시작되었습니다.', 'info');
    } finally {
      setActionLoading(false);
    }
  }, [showToast]);

  const reorderTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  return {
    todos,
    isLoading,
    actionLoading,
    editingId,
    editingText,
    deleteId,
    setEditingId,
    setEditingText,
    setDeleteId,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    startEditing,
    resetTodos,
    reorderTodos,
  };
};