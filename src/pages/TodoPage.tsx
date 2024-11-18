// src/pages/TodoPage.tsx
import { useState, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import { useSettings } from "../hooks/useSettings";
import TodoInput from "../components/todo/TodoInput";
import TodoList from "../components/todo/TodoList";
import TodoProgress from "../components/todo/TodoProgress";
import DeleteModal from "../components/common/DeleteModal";
import Header from "../components/layout/Header";
import { checkShouldReset } from "../utils/date";
import { STORAGE_KEY } from "@/constants/storage";

const TodoPage = () => {
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

  const [newTodo, setNewTodo] = useState("");
  const [isHidingCompleted, setIsHidingCompleted] = useState(false);

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

    const interval = setInterval(checkReset, 1000);
    return () => clearInterval(interval);
  }, [todos, settings.resetTime, resetTodos]);

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateTodo(id, editingText);
    } else if (e.key === "Escape") {
      setEditingText("");
      setEditingId(null);
    }
  };

  const completedTodos = todos.filter((todo) => todo.isCompleted).length;

  const handleClearAll = () => {
    localStorage.removeItem(STORAGE_KEY.TODOS);
    window.location.reload();
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    reorderTodos(newTodos);
  };

  const filteredTodos = isHidingCompleted 
    ? todos.filter(todo => !todo.isCompleted)
    : todos;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onClearAll={handleClearAll}
        onClearCompleted={handleClearCompleted}
        onReset={resetTodos}
        onToggleHideCompleted={() => setIsHidingCompleted(!isHidingCompleted)}
        isHidingCompleted={isHidingCompleted}
      />
      
      <div className="max-w-lg mx-auto px-4 py-4">
        <TodoProgress
          total={todos.length}
          completed={completedTodos}
          maxTodos={settings.maxTodos}
          resetTime={settings.resetTime}
        />

        <TodoInput
          value={newTodo}
          onChange={setNewTodo}
          onSubmit={(text, priority) => {
            if (todos.length >= settings.maxTodos) {
              alert(`할 일은 최대 ${settings.maxTodos}개까지만 등록할 수 있습니다.`);
              return;
            }
            addTodo(text, priority);
            setNewTodo("");
          }}
        />

        <TodoList
          todos={filteredTodos}
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