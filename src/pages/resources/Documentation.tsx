import { useState } from 'react';
import { Button } from '../../components/ui/Button';

const docs = [
  {
    title: 'Getting Started',
    sections: [
      { id: 'installation', title: 'Installation' },
      { id: 'configuration', title: 'Configuration' },
      { id: 'first-steps', title: 'First Steps' },
    ],
  },
  {
    title: 'Features',
    sections: [
      { id: 'erp', title: 'ERP Suite' },
      { id: 'portfolio', title: 'Portfolio Management' },
      { id: 'financing', title: 'Financing Solutions' },
    ],
  },
];

export function Documentation() {
  const [activeSection, setActiveSection] = useState('installation');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-6">
              {docs.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {category.sections.map((section) => (
                      <li key={section.id}>
                        <Button
                          variant={activeSection === section.id ? 'primary' : 'secondary'}
                          className="w-full justify-start"
                          onClick={() => setActiveSection(section.id)}
                        >
                          {section.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="col-span-9">
            <div className="prose max-w-none">
              <h1>Documentation</h1>
              <p>Welcome to the Kiota Suit documentation.</p>
              {/* Add documentation content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}