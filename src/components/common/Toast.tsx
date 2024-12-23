// src/components/common/Toast.tsx
interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
  }
  
  const Toast = ({ message, type, onClose }: ToastProps) => {
    const bgColor = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    }[type];
  
    return (
      <div
        className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg 
        flex items-center justify-between min-w-[200px] animate-slide-up`}
      >
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 hover:text-gray-200"
        >
          ×
        </button>
      </div>
    );
  };
  
  export default Toast;