// src/contexts/ToastContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from '../components/common/Toast';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;  // number에서 string으로 변경
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    // crypto.randomUUID()를 사용하여 유니크한 ID 생성
    const id = crypto.randomUUID();
    
    setToasts(prev => {
      // 동일한 메시지가 있다면 제거
      const filteredToasts = prev.filter(t => t.message !== message);
      return [...filteredToasts, { id, message, type }];
    });

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};