import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
          <ToastContainer />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;