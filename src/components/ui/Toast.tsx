import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToastProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export function Toast({ title, message, type, onClose }: ToastProps) {
  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
        'transform transition-all duration-500 ease-in-out',
        {
          'ring-green-500 bg-green-50': type === 'success',
          'ring-red-500 bg-red-50': type === 'error',
          'ring-blue-500 bg-blue-50': type === 'info',
          'ring-yellow-500 bg-yellow-50': type === 'warning',
        }
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}