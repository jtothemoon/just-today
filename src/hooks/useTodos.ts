// src/hooks/useTodos.ts
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { Todo } from '../types/todo';
import { STORAGE_KEY } from '../constants/storage';

export const useTodos = () => {
  const { showToast } = useToast();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY.TODOS);
    if (saved) {
      const initialValue = JSON.parse(saved);
      return initialValue.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
    return [];
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.TODOS, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((content: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      content: content.trim(),
      isCompleted: false,
      createdAt: new Date(),
    };

    setTodos(prev => [...prev, todo]);
    showToast('할 일이 추가되었습니다.', 'success');
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
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, content: content.trim() } : todo
      )
    );
    setEditingId(null);
    setEditingText('');
    showToast('할 일이 수정되었습니다.', 'success');
  }, [showToast]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setDeleteId(null);
    showToast('할 일이 삭제되었습니다.', 'error');
  }, [showToast]);

  const startEditing = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.content);
  }, []);

  const resetTodos = useCallback(() => {
    setTodos([]);
    localStorage.removeItem(STORAGE_KEY.TODOS);
    showToast('새로운 하루가 시작되었습니다.', 'info');
  }, [showToast]);

  const reorderTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  return {
    todos,
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