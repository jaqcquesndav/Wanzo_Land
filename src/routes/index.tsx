import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from '../pages/About';
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";
import { Resources } from "../pages/Resources";
import { LeasingStore } from "../pages/leasing-store/LeasingStore";
import { ProductDetails } from "../pages/leasing-store/ProductDetails";
import { CustomRequest } from "../pages/leasing-store/CustomRequest";
import { UnderDevelopment } from "../components/ui/UnderDevelopment";
import { Team } from "../pages/Team";
import { FullscreenChat } from "../pages/chat/FullscreenChat";
import Tarification from '../pages/Tarification';
import FaqPage from '../pages/Faq';
import { Callback } from '../pages/auth/Callback';
import Profile from '../pages/Profile';
import Abonnement from '../pages/Abonnement';
import CompanyPage from '../pages/Company';
import FinancialInstitutionPage from '../pages/FinancialInstitution';
import OrganizationLegacy from '../pages/Organization';
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products/*"
        element={
          <UnderDevelopment
            pageName="Produits"
            description="Notre catalogue de produits est en cours de développement."
            showBody={true}
          />
        }
      />
      <Route
        path="/pricing"
        element={
          <UnderDevelopment
            pageName="Tarification"
            description="Nos offres et tarifs seront bientôt disponibles."
            showBody={true}
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
        element={<FaqPage />}
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
      {/* Pages statiques */}
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/team" element={<Team />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/tarification" element={<Tarification />} />
      
      {/* Routes protégées nécessitant une authentification */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/company" element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
      <Route path="/company/:companyId" element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
      <Route path="/financial-institution/:institutionId" element={<ProtectedRoute><FinancialInstitutionPage /></ProtectedRoute>} />
      <Route path="/abonnement" element={<ProtectedRoute><Abonnement /></ProtectedRoute>} />
      <Route path="/organization" element={<ProtectedRoute><OrganizationLegacy /></ProtectedRoute>} />
      
      <Route
        path="/unauthorized"
        element={
          <UnderDevelopment
            pageName="Accès non autorisé"
            description="Vous n'avez pas les permissions nécessaires pour accéder à cette page."
          />
        }
      />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/chat" element={<ProtectedRoute><FullscreenChat /></ProtectedRoute>} />
    </Routes>
  );
}
