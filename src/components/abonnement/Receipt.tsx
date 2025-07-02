import { useRef, forwardRef, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../assets/images/logokiota.png';
import '../../styles/receipt-print.css'; // Importer les styles d'impression

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
}

export interface ReceiptRef {
  downloadPDF: () => void;
}

const Receipt = forwardRef<ReceiptRef, ReceiptProps>(({ payment }, ref) => {
  const receiptRef = useRef<HTMLDivElement>(null);

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
      // Support des noms dépréciés "organization" et "org" pour la rétrocompatibilité
      if (user.company || user.organization || user.org) {
        clientName = user.company || user.organization || user.org;
      }
      if (user.name) userName = user.name;
      if (user.address) clientAddress = user.address;
      if (user.phone) clientPhone = user.phone;
    }
  } catch {}
  
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }
  
  let description = '';
  if (/recharge|token/i.test(payment.plan)) {
    description = 'Rechargement de tokens';
  } else {
    const d = new Date(payment.date);
    const mois = d.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    description = `Abonnement mensuel (${mois})`;
  }
  
  useImperativeHandle(ref, () => ({
    downloadPDF: handleDownloadPDF
  }));

  function handleDownloadPDF() {
    const input = receiptRef.current;
    if (!input) return;

    // Utiliser html2canvas pour capturer le div comme une image
    html2canvas(input, {
        scale: 2, // Augmenter la résolution pour une meilleure qualité
        useCORS: true,
        backgroundColor: '#ffffff',
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        // S'assurer que le contenu ne dépasse pas la hauteur de la page
        let finalHeight = height;
        if (height > pdfHeight) {
            finalHeight = pdfHeight;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, finalHeight);
        pdf.save(`facture-${payment.id}.pdf`);
    });
  }

  return (
    <div ref={receiptRef} className="receipt-container bg-white text-gray-900 p-6 sm:p-10 w-full font-sans">
        {/* En-tête */}
        <div className="receipt-header pb-6 border-b border-gray-200">
            <div className="text-center mb-4">
                <img src={logo} alt="i-kiotahub" className="receipt-logo h-16 mx-auto" />
            </div>
            <h2 className="font-bold text-3xl text-gray-800 text-center">FACTURE</h2>
            <div className="flex justify-between items-start text-sm text-gray-600 mt-4">
                <div className="font-semibold text-base">Réf. {payment.id}</div>
                <div>Date : {formatDate(payment.date)}</div>
            </div>
        </div>
        
        {/* Infos client et vendeur */}
        <div className="receipt-parties grid grid-cols-2 gap-8 my-8 text-sm">
            <div>
                <div className="font-semibold text-gray-500 mb-2 uppercase tracking-wider">Fournisseur</div>
                <div className="font-bold text-gray-800 text-base">i-kiotahub</div>
                <div className="text-gray-600 mt-1">
                    <div>RCCM: CD/GOMA/RCCM/23-B-00196</div>
                    <div>ID NAT: 19-H5300-N40995F</div>
                    <div>NIF: A2321658S</div>
                    <div>Email: ikiota@ikiotahub.com</div>
                    <div>Tél: +243 979 588 462</div>
                </div>
            </div>
            <div className="text-right">
                <div className="font-semibold text-gray-500 mb-2 uppercase tracking-wider">Client</div>
                <div className="font-bold text-gray-800 text-base">{clientName}</div>
                <div className="text-gray-600 mt-1">
                    {userName && <div>Payé par : {userName}</div>}
                    {clientAddress && <div>Adresse : {clientAddress}</div>}
                    {clientPhone && <div>Tél : {clientPhone}</div>}
                </div>
            </div>
        </div>
        
        {/* Description paiement */}
        <div className="receipt-description mb-6">
            <h3 className="text-base font-bold text-primary uppercase tracking-wide">{description}</h3>
        </div>
        
        {/* Tableau des lignes */}
        <div className="receipt-table mb-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="p-3 text-left font-semibold text-gray-600 border-b">Libellé</th>
                        <th className="p-3 text-right font-semibold text-gray-600 border-b">PU HT</th>
                        <th className="p-3 text-right font-semibold text-gray-600 border-b">Quantité</th>
                        <th className="p-3 text-right font-semibold text-gray-600 border-b">Montant HT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <td className="p-3 border-b">{payment.plan}</td>
                        <td className="p-3 text-right border-b">{montantHT.toFixed(2)} $</td>
                        <td className="p-3 text-right border-b">1</td>
                        <td className="p-3 text-right border-b">{montantHT.toFixed(2)} $</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        {/* Récapitulatif */}
        <div className="receipt-summary flex justify-end mb-8">
            <div className="w-full max-w-sm text-sm">
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Total HT</span>
                    <span className="font-semibold text-gray-800">{montantHT.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">TVA (16%)</span>
                    <span className="font-semibold text-gray-800">{tva.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-2">
                    <span className="font-bold text-gray-900 text-base">Total TTC</span>
                    <span className="font-bold text-primary text-xl">{payment.amount.toFixed(2)} $</span>
                </div>
            </div>
        </div>
        
        {/* Infos paiement */}
        <div className="receipt-payment-info text-sm p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="mb-1"><strong>Méthode de paiement :</strong> <span className="text-gray-800">{payment.method}</span></div>
            <div><strong>Statut :</strong> <span className="font-semibold text-green-600">{payment.status}</span></div>
        </div>
        
        {/* Footer OHADA */}
        <div className="receipt-footer text-xs text-gray-500 border-t border-gray-200 pt-4 mt-8 text-center">
            <p className="receipt-address mt-2"><strong>Adresse :</strong> RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda</p>
        </div>
    </div>
  );
});

export default Receipt;
