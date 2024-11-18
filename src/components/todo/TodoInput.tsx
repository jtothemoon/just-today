// src/components/todo/TodoInput.tsx
interface TodoInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
  }
  
  const TodoInput = ({ value, onChange, onSubmit }: TodoInputProps) => {
    return (
      <form onSubmit={onSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          추가
        </button>
      </form>
    );
  };
  
  export default TodoInput;