// src/components/todo/TodoList.tsx
import TodoItem from './TodoItem';
import { Todo } from '../../types/todo';

// src/components/todo/TodoList.tsx
interface TodoListProps {
  todos: Todo[];
  editingId: string | null;
  editingText: string;
  onToggle: (id: string) => void;
  onEdit: (text: string) => void;
  onEditComplete: (id: string, content: string) => void;
  onEditStart: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEditKeyDown: (e: React.KeyboardEvent, id: string) => void;
}

const TodoList = ({
  todos,
  editingId,
  editingText,
  onToggle,
  onEdit,
  onEditComplete,
  onEditStart,
  onDelete,
  onEditKeyDown,
}: TodoListProps) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editingText={editingText}
          onToggle={() => onToggle(todo.id)}
          onEdit={onEdit}
          onEditComplete={() => onEditComplete(todo.id, editingText)}
          onEditStart={() => onEditStart(todo)}
          onDelete={() => onDelete(todo.id)}
          onEditKeyDown={(e) => onEditKeyDown(e, todo.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;