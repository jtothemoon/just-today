// src/components/todo/TodoItem.tsx
import { Pencil, Trash2 } from 'lucide-react';
import { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editingText: string;
  onToggle: () => void;
  onEdit: (text: string) => void;
  onEditComplete: () => void;
  onEditStart: () => void;
  onDelete: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
}

const TodoItem = ({
  todo,
  isEditing,
  editingText,
  onToggle,
  onEdit,
  onEditComplete,
  onEditStart,
  onDelete,
  onEditKeyDown,
}: TodoItemProps) => {
  return (
    <li className="p-3 bg-white rounded shadow flex items-center gap-3 group">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={onToggle}
        className="w-5 h-5 cursor-pointer"
      />
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => onEdit(e.target.value)}
          onBlur={onEditComplete}
          onKeyDown={onEditKeyDown}
          className="flex-1 p-1 border rounded"
          autoFocus
        />
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <span
            className={`flex-1 ${!todo.isCompleted ? 'cursor-pointer' : ''} ${
              todo.isCompleted ? 'line-through text-gray-400' : ''
            }`}
            onClick={() => !todo.isCompleted && onEditStart()}
          >
            {todo.content}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!todo.isCompleted && (
              <button
                onClick={onEditStart}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;