import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from '../pages/About';
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";
import { Resources } from "../pages/Resources";
import { UserTypeSelection } from "../pages/auth/UserTypeSelection";
import { AppSelection } from "../pages/auth/AppSelection";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { AuthCallback } from "../pages/auth/AuthCallback";
import { LeasingStore } from "../pages/leasing-store/LeasingStore";
import { ProductDetails } from "../pages/leasing-store/ProductDetails";
import { CustomRequest } from "../pages/leasing-store/CustomRequest";
import { UnderDevelopment } from "../components/ui/UnderDevelopment";
import { Team } from "../pages/Team";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Routes d'authentification */}
      <Route path="/auth">
        <Route path="select" element={<UserTypeSelection />} />
        <Route path="apps/:userType" element={<AppSelection />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="callback" element={<AuthCallback />} />
      </Route>
      {/* Pages statiques et utilitaires */}
      <Route
        path="/about"
        element={
          <UnderDevelopment
            pageName="À propos"
            description="La page de présentation de notre entreprise est en cours de développement."
          />
        }
      />
      <Route
        path="/products/*"
        element={
          <UnderDevelopment
            pageName="Produits"
            description="Notre catalogue de produits est en cours de développement."
          />
        }
      />
      <Route
        path="/pricing"
        element={
          <UnderDevelopment
            pageName="Tarification"
            description="Nos offres et tarifs seront bientôt disponibles."
          />
        }
      />
      <Route
        path="/blog"
        element={
          <UnderDevelopment
            pageName="Blog"
            description="Notre blog est en cours de développement."
          />
        }
      />
      <Route
        path="/faq"
        element={
          <UnderDevelopment
            pageName="FAQ"
            description="Notre FAQ est en cours de développement."
          />
        }
      />
      <Route
        path="/contact"
        element={
          <UnderDevelopment
            pageName="Contact"
            description="Notre page de contact est en cours de développement."
          />
        }
      />
      <Route
        path="/resources"
        element={
          <UnderDevelopment
            pageName="Ressources"
            description="Notre centre de ressources est en cours de développement."
          />
        }
      />
      {/* Leasing Store */}
      <Route path="/leasing-store">
        <Route index element={<LeasingStore />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="custom-request" element={<CustomRequest />} />
      </Route>
      F{/* Pages statiques */}
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/team" element={<Team />} />
      <Route path="/resources" element={<Resources />} />
      <Route
        path="/unauthorized"
        element={
          <UnderDevelopment
            pageName="Accès non autorisé"
            description="Vous n'avez pas les permissions nécessaires pour accéder à cette page."
          />
        }
      />
      <Route
        path="*"
        element={
          <UnderDevelopment
            pageName="Page non trouvée"
            description="La page que vous recherchez n'existe pas."
          />
        }
      />
    </Routes>
  );
}
