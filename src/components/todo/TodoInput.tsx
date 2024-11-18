// src/components/todo/TodoInput.tsx
import { useState } from 'react';
import { Priority } from '../../types/todo';
import { getPriorityStyle, getPriorityLabel } from '../../utils/priority';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (text: string, priority: Priority) => void;
  disabled?: boolean;
}

const TodoInput = ({ value, onChange, onSubmit, disabled }: TodoInputProps) => {
  const [priority, setPriority] = useState<Priority>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value, priority);
  };

  const cyclePriority = () => {
    const priorities: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    setPriority(priorities[nextIndex]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="w-full p-2 pr-20 border rounded"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={cyclePriority}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-xs font-medium transition-colors ${getPriorityStyle(priority)}`}
        >
          {getPriorityLabel(priority)}
        </button>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={disabled}
      >
        추가
      </button>
    </form>
  );
};

export default TodoInput;