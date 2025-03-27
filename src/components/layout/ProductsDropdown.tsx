import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { NavigationItem } from './types';

interface ProductsDropdownProps {
  item: NavigationItem;
  isActive: boolean;
}

export function ProductsDropdown({ item, isActive }: ProductsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "relative flex items-center gap-x-1 py-2 text-sm font-semibold transition-colors",
          isActive
            ? "text-primary before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary"
            : "text-gray-700 hover:text-gray-900"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.name}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-screen max-w-md transform px-2">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-6 bg-white p-6">
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  to={child.href}
                  className="group -m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 group-hover:text-primary">
                      {child.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {child.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}