// src/components/todo/TodoProgress.tsx
import { useEffect, useState } from 'react';
import { getTimeUntilReset } from '../../utils/date';

interface TodoProgressProps {
  total: number;
  completed: number;
  maxTodos: number;
  resetTime: string;
}

const TodoProgress = ({ total, completed, maxTodos, resetTime }: TodoProgressProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilReset(resetTime));

  // 1분마다 남은 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilReset(resetTime));
    }, 60000);

    return () => clearInterval(interval);
  }, [resetTime]);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">오늘의 할 일</span>
        <span className="text-sm font-medium">
          {completed} / {total} 완료
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{
            width: `${total ? (completed / total) * 100 : 0}%`,
          }}
        />
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
        <span>초기화까지 {timeLeft}</span>
        <span>최대 {maxTodos}개 설정 가능</span>
      </div>
    </div>
  );
};

export default TodoProgress;