import { useRef, forwardRef, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import logo from '../../assets/images/logokiota.png';
import '../../styles/receipt-print.css';

interface ReceiptProps {
  payment: {
    id: string;
    date: string;
    amount: number;
    method: string;
    plan: string;
    status: string;
    receiptUrl?: string;
  };
  printMode?: boolean;
}

export interface ReceiptRef {
  downloadPDF: () => void;
}

const Receipt = forwardRef<ReceiptRef, ReceiptProps>(({ payment, printMode = false }, ref) => {
  // Calcul TVA RDC 16% (OHADA)
  const montantHT = payment.amount / 1.16;
  const tva = payment.amount - montantHT;
  
  // Récupération du client et user
  let clientName = 'Nom de la société';
  let userName = '';
  let clientAddress = '';
  let clientPhone = '';
  
  try {
    const stored = localStorage.getItem('auth0_user');
    if (stored) {
      const user = JSON.parse(stored);
      // PME/institution financière
      if (user.company || user.organization || user.org) {
        clientName = user.company || user.organization || user.org;
      }
      if (user.name) {
        userName = user.name;
      }
      if (user.address) {
        clientAddress = user.address;
      }
      if (user.phone) {
        clientPhone = user.phone;
      }
    }
  } catch {}
  
  // Format date
  function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  }
  
  // Détection du type de paiement
  let description = '';
  if (/recharge|token/i.test(payment.plan)) {
    description = 'Rechargement de tokens';
  } else {
    // Si abonnement, indiquer le mois
    const d = new Date(payment.date);
    const mois = d.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    description = `Abonnement mensuel (${mois})`;
  }
  
  const receiptRef = useRef<HTMLDivElement>(null);

  // Expose la fonction downloadPDF via la ref
  useImperativeHandle(ref, () => ({
    downloadPDF: handleDownloadPDF
  }));

  // Fonction pour générer un PDF natif avec jsPDF
  function handleDownloadPDF() {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;
    
    // Logo centré au-dessus du titre
    if (logo) {
      try {
        const img = new Image();
        img.src = logo;
        doc.addImage(img, 'PNG', pageWidth / 2 - 50, y, 100, 40);
      } catch (error) {
        console.error("Erreur lors de l'ajout du logo:", error);
      }
    }
    
    y += 60;
    // Titre centré
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('FACTURE', pageWidth / 2, y, { align: 'center' });
    
    y += 24;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('i-kiotahub (propriétaire de Wanzo)', pageWidth / 2, y, { align: 'center' });
    
    y += 18;
    doc.setFontSize(10);
    doc.text(`Réf. reçu : ${payment.id}`, 50, y);
    doc.text(`Date : ${formatDate(payment.date)}`, pageWidth - 180, y);
    
    y += 30;
    // Infos vendeur/client
    doc.setFont('helvetica', 'bold');
    doc.text('Vendeur', 50, y);
    doc.text('Client', pageWidth / 2 + 40, y);
    doc.setFont('helvetica', 'normal');
    
    y += 15;
    doc.text('i-kiotahub', 50, y);
    doc.text(clientName, pageWidth / 2 + 40, y);
    
    y += 13;
    doc.text('RCCM : CD/GOMA/RCCM/23-B-00196', 50, y);
    if (userName) doc.text(`Payé par : ${userName}`, pageWidth / 2 + 40, y);
    
    y += 13;
    doc.text('ID NAT : 19-H5300-N40995F', 50, y);
    if (clientAddress) doc.text(`Adresse : ${clientAddress}`, pageWidth / 2 + 40, y);
    
    y += 13;
    doc.text('NIF : A2321658S', 50, y);
    if (clientPhone) doc.text(`Tél : ${clientPhone}`, pageWidth / 2 + 40, y);
    
    y += 13;
    doc.text('Email : ikiota@ikiotahub.com', 50, y);
    doc.text('Tél : +243 979 588 462', 50, y + 13);
    
    y += 30;
    // Description paiement
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2563eb');
    doc.text(description, 50, y);
    doc.setTextColor('#000');
    doc.setFont('helvetica', 'normal');
    
    y += 22;
    // Tableau
    doc.setFont('helvetica', 'bold');
    doc.text('Libellé', 50, y);
    doc.text('PU HT', 200, y);
    doc.text('Quantité', 300, y);
    doc.text('PT HT', 400, y);
    
    y += 12;
    doc.setLineWidth(0.5);
    doc.line(50, y + 2, 480, y + 2);
    
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.text(payment.plan, 50, y);
    doc.text(`${montantHT.toFixed(2)} $`, 200, y, { align: 'right' });
    doc.text('1', 300, y, { align: 'right' });
    doc.text(`${montantHT.toFixed(2)} $`, 400, y, { align: 'right' });
    
    y += 22;
    // Récapitulatif
    doc.setFont('helvetica', 'bold');
    doc.text('Total HT', 300, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${montantHT.toFixed(2)} $`, 400, y, { align: 'right' });
    
    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.text('TVA (16%)', 300, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${tva.toFixed(2)} $`, 400, y, { align: 'right' });
    
    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.text('Total TTC', 300, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2563eb');
    doc.text(`${payment.amount.toFixed(2)} $`, 400, y, { align: 'right' });
    doc.setTextColor('#000');
    
    y += 28;
    // Infos paiement (séparées)
    doc.setFont('helvetica', 'normal');
    doc.text(`Méthode de paiement : ${payment.method}`, 50, y);
    
    y += 16;
    doc.text(`Statut : ${payment.status}`, 50, y);
    
    y += 30;
    // Footer OHADA en bas de page
    doc.setFontSize(9);
    doc.setTextColor('#666');
    doc.text('Ce reçu est délivré conformément à la réglementation OHADA et à la législation fiscale de la RDC.', 50, 800);
    doc.text('Merci pour votre confiance.', 50, 815);
    doc.text('Adresse : RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda', 50, 830);
    
    // Télécharger le PDF
    doc.save(`facture-${payment.id}.pdf`);
  }

  return (
    <div className={`flex flex-col h-full ${printMode ? 'print-content' : ''}`}>
      <div className="flex-1">
        <div
          ref={receiptRef}
          className="bg-white text-gray-900 rounded-xl w-full max-w-full receipt-container"
          style={{
            width: '100%',
            maxWidth: 800,
            minHeight: 400,
            maxHeight: printMode ? 'none' : 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            margin: '0 auto',
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Logo au-dessus du titre */}
          <div className="flex flex-col items-center mb-4 receipt-header">
            <img src={logo} alt="i-kiotahub" className="receipt-logo" style={{ height: 60, width: 'auto', objectFit: 'contain', maxWidth: 100 }} />
            <div className="font-bold text-xl sm:text-2xl mt-3 text-gray-800">FACTURE</div>
          </div>
          
          {/* En-tête */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="text-gray-500 text-sm font-medium">
              <div>Document: <span className="font-semibold text-gray-700">Facture</span></div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>Réf. reçu: <span className="font-semibold text-gray-700">{payment.id}</span></div>
              <div>Date: <span className="font-semibold text-gray-700">{formatDate(payment.date)}</span></div>
            </div>
          </div>
          
          {/* Infos client et vendeur */}
          <div className="flex flex-col sm:flex-row justify-between mb-8 gap-6 receipt-parties">
            <div className="text-sm sm:text-base flex-1">
              <div className="font-bold mb-2 text-gray-800 border-b pb-1">Vendeur</div>
              <div className="space-y-1 text-gray-700">
                <div>i-kiotahub</div>
                <div>RCCM: CD/GOMA/RCCM/23-B-00196</div>
                <div>ID NAT: 19-H5300-N40995F</div>
                <div>NIF: A2321658S</div>
                <div>Email: ikiota@ikiotahub.com</div>
                <div>Tél: +243 979 588 462</div>
              </div>
            </div>
            
            <div className="text-sm sm:text-base flex-1">
              <div className="font-bold mb-2 text-gray-800 border-b pb-1">Client</div>
              <div className="space-y-1 text-gray-700">
                <div className="font-semibold">{clientName}</div>
                {userName && <div>Payé par: <span className="font-semibold">{userName}</span></div>}
                {clientAddress && <div>Adresse: {clientAddress}</div>}
                {clientPhone && <div>Tél: {clientPhone}</div>}
              </div>
            </div>
          </div>
          
          {/* Description paiement */}
          <div className="mb-6 receipt-description">
            <div className="text-base font-semibold text-primary mb-2">{description}</div>
            <p className="text-sm text-gray-600">Merci pour votre paiement. Votre facture est détaillée ci-dessous.</p>
          </div>
          
          {/* Tableau des lignes */}
          <div className="mb-8 overflow-x-auto receipt-table">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-3 text-left font-semibold">Libellé</th>
                  <th className="border px-4 py-3 text-right font-semibold">PU HT</th>
                  <th className="border px-4 py-3 text-right font-semibold">Quantité</th>
                  <th className="border px-4 py-3 text-right font-semibold">PT HT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-3">{payment.plan}</td>
                  <td className="border px-4 py-3 text-right">{montantHT.toFixed(2)} $</td>
                  <td className="border px-4 py-3 text-right">1</td>
                  <td className="border px-4 py-3 text-right">{montantHT.toFixed(2)} $</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Récapitulatif */}
          <div className="flex flex-col items-end mb-8 receipt-summary">
            <table className="text-sm w-full max-w-xs">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">Total HT</td>
                  <td className="py-2 text-right font-semibold">{montantHT.toFixed(2)} $</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">TVA (16%)</td>
                  <td className="py-2 text-right font-semibold">{tva.toFixed(2)} $</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 font-bold text-gray-800">Total TTC</td>
                  <td className="py-3 text-right font-bold text-primary">{payment.amount.toFixed(2)} $</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Infos paiement */}
          <div className="mb-8 text-sm p-4 bg-gray-50 rounded-lg receipt-payment-info">
            <div className="mb-1">Méthode de paiement: <span className="font-semibold text-gray-700">{payment.method}</span></div>
            <div>Statut: <span className="font-semibold text-green-600">{payment.status}</span></div>
          </div>
          
          {/* Footer OHADA */}
          <div className="text-xs text-gray-500 border-t pt-4 mt-8 receipt-footer">
            <div className="mt-2">Merci pour votre confiance.</div>
          </div>
          
          {/* Adresse vendeur en bas de page */}
          <div className="text-xs text-gray-400 mt-8 text-center receipt-address">
            Adresse: RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda
          </div>
        </div>
      </div>
    </div>
  );
});

export default Receipt;
