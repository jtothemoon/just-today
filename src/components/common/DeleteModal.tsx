// src/components/common/DeleteModal.tsx
interface DeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h2>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;