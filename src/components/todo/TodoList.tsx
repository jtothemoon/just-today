// src/components/todo/TodoList.tsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      onReorder(newTodos);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
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
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
