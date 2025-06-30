import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
        <ToastContainer />
      </Layout>
    </Router>
  );
}

export default App;