import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
  const navigate = useNavigate();

  const requireAuth = (action?: string) => {
    const params = new URLSearchParams();
    if (action) params.append('action', action);
    
    navigate({
      pathname: '/auth/redirect',
      search: params.toString()
    });
  };

  const requireRegister = (action?: string) => {
    const params = new URLSearchParams();
    if (action) params.append('action', action);
    
    navigate({
      pathname: '/auth/redirect',
      search: params.toString()
    });
  };

  return {
    requireAuth,
    requireRegister
  };
}