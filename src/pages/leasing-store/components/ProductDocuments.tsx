import { FileText, Download } from 'lucide-react';
import type { Product } from '../types';

interface ProductDocumentsProps {
  product: Product;
}

export function ProductDocuments({ }: ProductDocumentsProps) {
  // Simule des documents pour la démo
  const documents = [
    {
      name: 'Fiche technique',
      type: 'PDF',
      size: '2.4 MB',
      url: '#',
    },
    {
      name: 'Guide d\'utilisation',
      type: 'PDF',
      size: '3.8 MB',
      url: '#',
    },
    {
      name: 'Certificat de conformité',
      type: 'PDF',
      size: '1.2 MB',
      url: '#',
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Documents</h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-500">
                  {doc.type} • {doc.size}
                </p>
              </div>
            </div>
            <a
              href={doc.url}
              download
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}