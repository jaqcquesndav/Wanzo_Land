import logo from '../../assets/images/wanzo_logo.png';

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
  // payment: { id, date, amount, method, plan, status, receiptUrl }
  return (
    <div className="max-w-md mx-auto bg-white border rounded-xl shadow p-6 text-gray-900 text-sm">
      <div className="flex items-center gap-4 mb-4">
        <img src={logo} alt="i-kiotahub" className="h-12 w-12 object-contain" />
        <div>
          <div className="font-bold text-lg">Reçu de paiement</div>
          <div className="text-xs text-gray-500">i-kiotahub (propriétaire de Wanzo)</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="font-semibold">Référence paiement : <span className="font-normal">{payment.id}</span></div>
        <div>Date : {payment.date}</div>
        <div>Montant : <span className="font-bold text-primary">${payment.amount}</span></div>
        <div>Méthode : {payment.method}</div>
        <div>Plan : {payment.plan}</div>
        <div>Statut : {payment.status}</div>
      </div>
      <div className="mt-4 border-t pt-4 text-xs text-gray-700">
        <div className="font-bold mb-1">i-kiotahub</div>
        <div>Adresse : RDC/Nord-Kivu/Goma, Commune de Goma, Quartier Lac Vert, Avenue Kabanda</div>
        <div>Tél : +243 979 588 462</div>
        <div>Email : ikiota@ikiotahub.com</div>
        <div>RCCM : CD/GOMA/RCCM/23-B-00196</div>
        <div>ID NAT : 19-H5300-N40995F</div>
        <div>NIF : A2321658S</div>
      </div>
    </div>
  );
}
