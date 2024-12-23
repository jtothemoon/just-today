// src/components/todo/TodoItem.tsx
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMediaQuery } from "react-responsive";
import { Pencil, Trash2, GripVertical, Check } from "lucide-react";
import { Todo, Priority } from "../../types/todo";
import { getPriorityStyle, getPriorityLabel } from "../../utils/priority";

interface SortableTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editingText: string;
  onToggle: () => void;
  onEdit: (text: string) => void;
  onEditComplete: (priority?: Priority) => void;
  onEditStart: () => void;
  onDelete: () => void;
  onEditKeyDown: (e: React.KeyboardEvent, priority?: Priority) => void;
  isDragging?: boolean;
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
  isDragging,
}: SortableTodoItemProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [editingPriority, setEditingPriority] = useState<Priority>(
    todo.priority
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id, disabled: isEditing });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`p-3 bg-white rounded shadow flex items-center gap-3 group relative
       ${isDragging ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
    >
      {/* 데스크톱용 드래그 핸들 */}
      {isDesktop && (
        <div
          {...attributes}
          {...listeners}
          className="hidden md:block cursor-grab hover:text-gray-600"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* 실제 컨텐츠 영역 */}
      <div
        {...(!isDesktop && { ...attributes, ...listeners })}
        className="flex-1 flex items-center gap-3 z-10 relative"
      >
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onToggle}
          className="w-5 h-5 cursor-pointer"
        />

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editingText}
              onChange={(e) => onEdit(e.target.value)}
              className="flex-1 p-1 border rounded"
              autoFocus
            />
            <button
              type="button"
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                editingPriority
              )}`}
              onClick={() => {
                const priorities: Priority[] = ["HIGH", "MEDIUM", "LOW"];
                const currentIndex = priorities.indexOf(editingPriority);
                const nextIndex = (currentIndex + 1) % priorities.length;
                setEditingPriority(priorities[nextIndex]);
              }}
            >
              {getPriorityLabel(editingPriority)}
            </button>
            <button
              onClick={() => onEditComplete(editingPriority)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Check className="w-4 h-4 text-green-500" />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <span
              className={`flex-1 ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.content}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                  todo.priority
                )}`}
              >
                {getPriorityLabel(todo.priority)}
              </span>
              <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
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
          </div>
        )}
      </div>
    </li>
  );
}
