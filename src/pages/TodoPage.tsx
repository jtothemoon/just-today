// src/pages/TodoPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useSettings } from '../hooks/useSettings';
import TodoInput from '../components/todo/TodoInput';
import TodoList from '../components/todo/TodoList';
import TodoProgress from '../components/todo/TodoProgress';
import DeleteModal from '../components/common/DeleteModal';
import { checkShouldReset } from '../utils/date';
import { STORAGE_KEY } from '@/constants/storage';

const TodoPage = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const {
    todos,
    editingId,
    editingText,
    deleteId,
    setEditingText,
    setEditingId,
    setDeleteId,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    startEditing,
    resetTodos,
    reorderTodos,
  } = useTodos();

  const [newTodo, setNewTodo] = useState('');

  // 주기적으로 초기화 시간 체크
  useEffect(() => {
    const checkReset = () => {
      if (todos.length > 0) {
        const lastTodo = todos[0];
        if (checkShouldReset(lastTodo.createdAt, settings.resetTime)) {
          setTimeout(() => resetTodos(), 0);
        }
      }
    };

    const interval = setInterval(checkReset, 1000); // 1초마다 체크
    return () => clearInterval(interval);
  }, [todos, settings.resetTime, resetTodos]);

  // 날짜 변경 체크
  useEffect(() => {
    if (todos.length > 0) {
      const lastTodo = todos[0];
      if (checkShouldReset(lastTodo.createdAt, settings.resetTime)) {
        localStorage.removeItem(STORAGE_KEY.TODOS);
        window.location.reload();
      }
    }
  }, [todos, settings.resetTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    if (todos.length >= settings.maxTodos) {
      alert(`할 일은 최대 ${settings.maxTodos}개까지만 등록할 수 있습니다.`);
      return;
    }

    addTodo(newTodo);
    setNewTodo('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateTodo(id, editingText);
    } else if (e.key === 'Escape') {
      setEditingText('');
      setEditingId(null);
    }
  };

  const completedTodos = todos.filter(todo => todo.isCompleted).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Just Today</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        <TodoProgress
          total={todos.length}
          completed={completedTodos}
          maxTodos={settings.maxTodos}
          resetTime={settings.resetTime}
        />

        <TodoInput
          value={newTodo}
          onChange={setNewTodo}
          onSubmit={handleSubmit}
        />

        <TodoList
          todos={todos}
          editingId={editingId}
          editingText={editingText}
          onToggle={toggleTodo}
          onEdit={setEditingText}
          onEditComplete={(id, content) => updateTodo(id, content)}
          onEditStart={startEditing}
          onDelete={setDeleteId}
          onEditKeyDown={handleEditKeyDown}
          onReorder={reorderTodos}
        />

        {deleteId && (
          <DeleteModal
            onConfirm={() => deleteTodo(deleteId)}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoPage;