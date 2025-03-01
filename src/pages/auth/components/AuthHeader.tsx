interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  error?: string | null;
  successMessage?: string | null;
}

export function AuthHeader({ title, subtitle, error, successMessage }: AuthHeaderProps) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <h4 className="mt-6 text-center text-2xl tracking-tight text-gray-900">
          {subtitle}
        </h4>
      )}
      
      {successMessage && (
        <div className="mt-2 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}