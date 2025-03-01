import { Toast } from './Toast';
import { useToast } from '../../hooks/useToast';

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => {
              // Toast will auto-dismiss
            }}
          />
        ))}
      </div>
    </div>
  );
}