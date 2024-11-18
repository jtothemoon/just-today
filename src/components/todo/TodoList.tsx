// src/components/todo/TodoList.tsx
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTodoItem } from "./TodoItem";
import { Todo } from "../../types/todo";

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
  onReorder: (newTodos: Todo[]) => void; // 추가
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
  onReorder,
}: TodoListProps) => {
  const sensors = useSensors(
    useSensor(TouchSensor, {
      // 모바일용 터치 센서 설정
      activationConstraint: {
        delay: 200,      // 200ms 길게 누르기
        tolerance: 8,    // 8px 이내 움직임 허용
      }
    }),
    useSensor(MouseSensor, {
      // 마우스용 센서 설정
      activationConstraint: {
        distance: 8,     // 8px 이상 움직여야 드래그 시작
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      onReorder(newTodos);
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {todos.map((todo) => (
            <SortableTodoItem
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
              isDragging={activeId === todo.id}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
