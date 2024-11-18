// src/components/todo/SortableTodoItem.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { Todo } from '../../types/todo';

interface SortableTodoItemProps {
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

export function SortableTodoItem({
  todo,
  isEditing,
  editingText,
  onToggle,
  onEdit,
  onEditComplete,
  onEditStart,
  onDelete,
  onEditKeyDown
}: SortableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="p-3 bg-white rounded shadow flex items-center gap-3 group"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-gray-600"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      
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
            className={`flex-1 ${!todo.isCompleted ? 'cursor-pointer' : ''} 
            ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}
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
}