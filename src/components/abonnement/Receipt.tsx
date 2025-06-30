import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../assets/images/logokiota.png';

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

export default function Receipt({ payment }: ReceiptProps) {
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

  // Ajout d'une fonction pour générer un PDF natif jsPDF (pas capture d'écran)
  function handleDownloadPDF() {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;
    // Logo centré au-dessus du titre
    if (logo) {
      // @ts-ignore
      doc.addImage(logo, 'PNG', pageWidth / 2 - 50, y, 100, 40);
    }
    y += 60;
    // Titre centré
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('FACTURE', pageWidth / 2, y, { align: 'center' });
    y += 24;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    //doc.text('i-kiotahub (propriétaire de Wanzo)', pageWidth / 2, y, { align: 'center' });
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
    doc.save(`facture-${payment.id}.pdf`);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div
          ref={receiptRef}
          className="bg-white text-gray-900 rounded-xl shadow w-full max-w-full overflow-auto"
          style={{
            width: '100%',
            maxWidth: 800,
            minHeight: 400,
            maxHeight: '80vh',
            fontFamily: 'serif',
            margin: '0 auto',
            padding: '1rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Logo au-dessus du titre */}
          <div className="flex flex-col items-center mb-2">
            <img src={logo} alt="i-kiotahub" style={{ height: 48, width: 'auto', objectFit: 'contain', maxWidth: 80 }} />
            <div className="font-bold text-xl sm:text-2xl mt-2">FACTURE</div>
            <div className="text-xs sm:text-sm text-gray-500">i-kiotahub (propriétaire de Wanzo)</div>
          </div>
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <div className="ml-auto text-right text-xs text-gray-500">
              <div>Réf. reçu : <span className="font-semibold">{payment.id}</span></div>
              <div>Date : {formatDate(payment.date)}</div>
            </div>
          </div>
          {/* Infos client et vendeur */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div className="text-xs sm:text-sm">
              <div className="font-bold mb-1">Vendeur</div>
              <div>i-kiotahub</div>
              <div>RCCM : CD/GOMA/RCCM/23-B-00196</div>
              <div>ID NAT : 19-H5300-N40995F</div>
              <div>NIF : A2321658S</div>
              <div>Email : ikiota@ikiotahub.com</div>
              <div>Tél : +243 979 588 462</div>
            </div>
            <div className="text-xs sm:text-sm text-right">
              <div className="font-bold mb-1">Client</div>
              <div><span className="font-semibold">{clientName}</span></div>
              {userName && <div>Payé par : <span className="font-semibold">{userName}</span></div>}
              {clientAddress && <div>Adresse : {clientAddress}</div>}
              {clientPhone && <div>Tél : {clientPhone}</div>}
            </div>
          </div>
          {/* Description paiement */}
          <div className="mb-4 text-sm font-semibold text-primary">{description}</div>
          {/* Tableau des lignes */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border text-xs sm:text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-2 text-left">Libellé</th>
                  <th className="border px-2 py-2 text-right">PU HT</th>
                  <th className="border px-2 py-2 text-right">Quantité</th>
                  <th className="border px-2 py-2 text-right">PT HT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-2">{payment.plan}</td>
                  <td className="border px-2 py-2 text-right">{montantHT.toFixed(2)} $</td>
                  <td className="border px-2 py-2 text-right">1</td>
                  <td className="border px-2 py-2 text-right">{montantHT.toFixed(2)} $</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Récapitulatif */}
          <div className="flex flex-col items-end mb-8">
            <table className="text-xs sm:text-sm w-full max-w-xs">
              <tbody>
                <tr>
                  <td className="py-1">Total HT</td>
                  <td className="py-1 text-right font-semibold">{montantHT.toFixed(2)} $</td>
                </tr>
                <tr>
                  <td className="py-1">TVA (16%)</td>
                  <td className="py-1 text-right font-semibold">{tva.toFixed(2)} $</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 font-bold">Total TTC</td>
                  <td className="py-2 text-right font-bold text-primary">{payment.amount.toFixed(2)} $</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Infos paiement */}
          <div className="mb-8 text-xs sm:text-sm">
            <div>Méthode de paiement : <span className="font-semibold">{payment.method}</span></div>
            <div>Statut : <span className="font-semibold">{payment.status}</span></div>
          </div>
          {/* Footer OHADA */}
          <div className="text-xs text-gray-500 border-t pt-4 mt-8">
            <div>Ce reçu est délivré conformément à la réglementation OHADA et à la législation fiscale de la RDC.</div>
            <div className="mt-2">Merci pour votre confiance.</div>
          </div>
          {/* Adresse vendeur en bas de page */}
          <div className="text-xs text-gray-400 mt-8 text-center">
            Adresse : RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark"
          onClick={handleDownloadPDF}
        >
          Télécharger le PDF
        </button>
      </div>
    </div>
  );
}
