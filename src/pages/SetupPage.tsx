// src/pages/SetupPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetupPage = () => {
  const navigate = useNavigate();
  const [maxTodos, setMaxTodos] = useState(5);
  const [resetTime, setResetTime] = useState("00:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'just-today-settings', 
      JSON.stringify({ maxTodos, resetTime })
    );
    navigate('/todos');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Just Today</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              오늘 할 일은 몇 개로 제한할까요?
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={maxTodos}
              onChange={(e) => setMaxTodos(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="w-full p-3 border rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500">1-10개 사이로 설정할 수 있습니다</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              하루의 시작 시간을 설정해주세요
            </label>
            <input
              type="time"
              value={resetTime}
              onChange={(e) => setResetTime(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500">이 시간이 되면 자동으로 초기화됩니다</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupPage;