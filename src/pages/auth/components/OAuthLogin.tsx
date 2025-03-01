import { Button } from '../../../components/ui/Button';

interface OAuthLoginProps {
  onLogin: (provider?: string) => Promise<void>;
  isLoading: boolean;
}

export function OAuthLogin({ onLogin, isLoading }: OAuthLoginProps) {
  return (
    <div className="space-y-6">
      <Button
        onClick={() => onLogin()}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Signing in...' : 'Sign in with Email'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => onLogin('google-oauth2')}
          variant="secondary"
          className="w-full flex items-center justify-center"
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Google
        </Button>
        <Button
          onClick={() => onLogin('apple')}
          variant="secondary"
          className="w-full flex items-center justify-center"
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16.125,0.175c-0.124,0.1-2.392,1.328-2.392,4.075c0,3.167,2.763,4.292,2.842,4.292c-0.024,0.078-0.457,1.593-1.507,3.155c-0.91,1.328-1.854,2.656-3.335,2.656c-1.458,0-1.923-0.864-3.594-0.864c-1.718,0-2.258,0.864-3.669,0.864c-1.458,0-2.571-1.401-3.505-2.75C0.017,10.116,0,8.093,0,7.25c0-3.264,2.12-4.991,4.201-4.991c1.106,0,2.028,0.732,2.72,0.732c0.668,0,1.718-0.775,2.995-0.775C10.964,2.216,14.684,2.162,16.125,0.175z M12.982,1.866c-0.124-1.036,0.379-2.095,0.91-2.763c0.552-0.688,1.523-1.212,2.317-1.244C16.333-1.105,15.869,0,15.317,0.688C14.741,1.401,14.14,2.483,14.289,3.519L12.982,1.866z"
            />
          </svg>
          Apple
        </Button>
        <Button
          onClick={() => onLogin('facebook')}
          variant="secondary"
          className="w-full flex items-center justify-center"
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073c0-6.627,5.373-12,12-12S24,5.445,24,12.073z"
            />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
}