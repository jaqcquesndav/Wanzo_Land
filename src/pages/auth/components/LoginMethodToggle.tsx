interface LoginMethodToggleProps {
  loginMethod: 'oauth' | 'direct';
  onToggle: (method: 'oauth' | 'direct') => void;
}

export function LoginMethodToggle({ loginMethod, onToggle }: LoginMethodToggleProps) {
  return (
    <div className="mb-6 flex justify-center">
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => onToggle('oauth')}
          className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
            loginMethod === 'oauth' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          }`}
        >
          OAuth
        </button>
        <button
          type="button"
          onClick={() => onToggle('direct')}
          className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
            loginMethod === 'direct' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          }`}
        >
          Email/Password
        </button>
      </div>
    </div>
  );
}