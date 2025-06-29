import { UnderDevelopment } from '../components/ui/UnderDevelopment';

export function Contact() {
  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      {/* SVG curves for fluidity and section connection */}
      <svg className="absolute top-0 left-0 w-full h-32 z-0" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,80 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#e5e7eb" />
      </svg>
      <svg className="absolute top-32 left-0 w-full h-24 z-0" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,48 C480,96 960,0 1440,48 L1440,0 L0,0 Z" fill="#f3f4f6" />
      </svg>
      <UnderDevelopment 
        pageName="Contact" 
        description="Notre page de contact est en cours de développement. En attendant, vous pouvez nous contacter par email à contact@kiota.com"
      />
    </div>
  );
}