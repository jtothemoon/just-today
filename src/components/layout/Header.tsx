// src/components/layout/Header.tsx
import { Settings, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onClearAll: () => void;
  onClearCompleted: () => void;
  onReset: () => void;
  onToggleHideCompleted: () => void;
  isHidingCompleted: boolean;
}

const Header = ({
  onClearAll,
  onClearCompleted,
  onReset,
  onToggleHideCompleted,
  isHidingCompleted
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white z-10 border-b">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Just Today</h1>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors md:mr-2"
            aria-label="설정"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="메뉴"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border">
                <button
                  onClick={() => {
                    onToggleHideCompleted();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {isHidingCompleted ? '완료된 항목 표시' : '완료된 항목 숨기기'}
                </button>
                <button
                  onClick={() => {
                    onClearCompleted();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  완료된 항목 삭제
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    if (confirm('모든 할 일을 초기화하시겠습니까?')) {
                      onReset();
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-yellow-600"
                >
                  수동 초기화
                </button>
                <button
                  onClick={() => {
                    if (confirm('정말 모든 할 일을 삭제하시겠습니까?')) {
                      onClearAll();
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                >
                  전체 삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;