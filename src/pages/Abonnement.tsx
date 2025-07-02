import React, { useState, useEffect, useRef } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { useUser } from '../hooks/useUser';
import { UserCircle, Download } from 'lucide-react';
import Receipt, { ReceiptRef } from '../components/abonnement/Receipt';
import { PaymentDetails, PaymentRecord, PricingPlan } from '../types/user';
import TokenRing from '../components/abonnement/TokenRing';

const paymentMethods = [
  { key: 'card', label: 'Carte bancaire (VISA/Mastercard)' },
  { key: 'mobile', label: 'Mobile Money (Airtel, Orange, M-PESA)' },
  { key: 'manual', label: 'Paiement manuel (preuve)' },
];

// Composant : Sélecteur de plan
function PlanSelector({ plans, currentPlan, onSelect }: { plans: PricingPlan[]; currentPlan: string; onSelect: (plan: string) => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Changer de plan</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-xl border p-4 flex flex-col items-center ${plan.name === currentPlan ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-xl font-bold mb-1">{plan.name}</div>
            <div className="text-sm text-gray-600 mb-2">{plan.description}</div>
            <div className="text-2xl font-bold text-primary mb-2">${plan.price}</div>
            <button
              className={`px-4 py-1 rounded ${plan.name === currentPlan ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
              onClick={() => onSelect(plan.name)}
              disabled={plan.name === currentPlan}
            >
              {plan.name === currentPlan ? 'Votre plan' : 'Choisir ce plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Composant : Paiement enrichi
function PaymentPanel({ paymentType, setPaymentType, paymentInfo, setPaymentInfo, error, onSubmit, paymentMethods, selectedPlan, plans }: any) {
  function sanitize(str: string) {
    return String(str).replace(/[<>"'`;\\]/g, '');
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'proof') {
      setPaymentInfo({ ...paymentInfo, proof: files ? files[0] : null });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: sanitize(value) });
    }
  }
  // Détection recharge tokens (plus robuste, insensible à la casse)
  const isRecharge = typeof selectedPlan === 'string' && /recharge|token/i.test(selectedPlan);
  // Calcul tokens achetés
  let tokensAchat = 0;
  if (isRecharge && paymentInfo.amount && !isNaN(Number(paymentInfo.amount))) {
    tokensAchat = Math.floor((Number(paymentInfo.amount) / 5) * 1_000_000);
  }
  // Illustrations et logos (placeholders SVG, à remplacer par vos assets)
  const icons = {
    card: (
      <div className="flex items-center gap-2 mb-2">
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none"><rect width="36" height="24" rx="4" fill="#f3f4f6"/><rect x="3" y="7" width="30" height="3" rx="1.5" fill="#e5e7eb"/><rect x="3" y="14" width="10" height="2" rx="1" fill="#e5e7eb"/></svg>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
      </div>
    ),
    mobile: (
      <div className="flex items-center gap-2 mb-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="2" width="20" height="24" rx="3" fill="#f3f4f6"/><rect x="8" y="6" width="12" height="12" rx="2" fill="#e5e7eb"/></svg>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Orange_logo.svg" alt="Orange" className="h-5" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Airtel_logo.svg" alt="Airtel" className="h-5" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/M-PESA_LOGO.svg" alt="M-PESA" className="h-5" />
      </div>
    ),
    manual: (
      <div className="flex items-center gap-2 mb-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="20" height="20" rx="4" fill="#f3f4f6"/><rect x="8" y="8" width="12" height="4" rx="2" fill="#e5e7eb"/><rect x="8" y="16" width="8" height="2" rx="1" fill="#e5e7eb"/></svg>
        <span className="text-gray-500 text-sm">Preuve manuelle</span>
      </div>
    ),
  };
  // Résumé du plan sélectionné (nom, prix)
  return (
    <form className="max-w-lg w-full mx-auto bg-white rounded-2xl p-4 sm:p-8 shadow-lg mb-6 border border-gray-100" onSubmit={onSubmit}>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold mb-1">Paiement pour <span className="text-primary">{selectedPlan}</span></h3>
          <div className="text-sm text-gray-500">Plan&nbsp;: <span className="font-semibold">{selectedPlan}</span> &bull; Prix&nbsp;: <span className="text-primary font-bold">{isRecharge ? (paymentInfo.amount ? `$${paymentInfo.amount}` : '-') : `$${(typeof selectedPlan === 'string' && paymentMethods && plans.find((p:any)=>p.name===selectedPlan)?.price) || '-'}`}</span></div>
        </div>
        <div className="hidden sm:block">
          {/* Illustration placeholder */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#f3f4f6"/><rect x="12" y="20" width="24" height="8" rx="4" fill="#e5e7eb"/></svg>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isRecharge && (
          <div className="mb-4 col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Montant à recharger ($)</label>
            <input name="amount" type="number" min="1" step="0.01" placeholder="Montant en dollars" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.amount || ''} onChange={handleChange} required={isRecharge} />
            <div className="text-xs text-gray-500 mt-1">
              {paymentInfo.amount && !isNaN(Number(paymentInfo.amount)) && Number(paymentInfo.amount) > 0 ? (
                <span>Vous recevrez <span className="font-semibold text-primary">{tokensAchat.toLocaleString()} tokens</span> pour <span className="font-semibold">${Number(paymentInfo.amount).toFixed(2)}</span> (5&nbsp;$ = 1&nbsp;000&nbsp;000 tokens)</span>
              ) : (
                <span>5&nbsp;$ = 1&nbsp;000&nbsp;000 tokens</span>
              )}
            </div>
          </div>
        )}
        <div className="mb-4 col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Méthode de paiement</label>
          <select className="w-full rounded border-gray-300" value={paymentType} onChange={e => setPaymentType(e.target.value)}>
            {paymentMethods.map((m: any) => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
        </div>
      </div>
      {/* Affichage illustration/logo selon la méthode */}
      <div className="mb-2">{icons[paymentType as 'card' | 'mobile' | 'manual']}</div>
      {paymentType === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input name="cardNumber" type="text" maxLength={19} placeholder="Numéro de carte" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.cardNumber} onChange={handleChange} autoComplete="cc-number" />
          <input name="cardExp" type="text" maxLength={5} placeholder="MM/AA" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.cardExp} onChange={handleChange} autoComplete="cc-exp" />
          <input name="cardCvv" type="password" maxLength={4} placeholder="CVV" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.cardCvv} onChange={handleChange} autoComplete="cc-csc" />
        </div>
      )}
      {paymentType === 'mobile' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input name="mobileNumber" type="text" maxLength={15} placeholder="N° Téléphone" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.mobileNumber} onChange={handleChange} />
          <input name="mobilePin" type="password" maxLength={6} placeholder="Code PIN" className="rounded border-gray-300 focus:ring-2 focus:ring-primary w-full" value={paymentInfo.mobilePin} onChange={handleChange} />
        </div>
      )}
      {paymentType === 'manual' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Preuve de paiement (photo ou PDF)</label>
          <input name="proof" type="file" accept="image/*,application/pdf" className="block w-full" onChange={handleChange} />
        </div>
      )}
      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-4">
        <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark shadow w-full sm:w-auto">Payer</button>
      </div>
    </form>
  );
}

// Composant : Options avancées
function SubscriptionOptions() {
  return (
    <div className="max-w-lg mx-auto bg-gray-50 rounded-xl p-6 shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Options avancées</h3>
      <ul className="space-y-2">
        <li><input type="checkbox" id="auto-deduction" className="mr-2" disabled /> <label htmlFor="auto-deduction">Déductions automatiques (à venir)</label></li>
        <li><input type="checkbox" id="annual-plan" className="mr-2" disabled /> <label htmlFor="annual-plan">Forfait annuel (à venir)</label></li>
        <li><input type="checkbox" id="save-card" className="mr-2" disabled /> <label htmlFor="save-card">Enregistrer ma carte (à venir)</label></li>
      </ul>
      <div className="text-xs text-gray-400 mt-4">Les options seront bientôt disponibles.</div>
    </div>
  );
}

export default function Abonnement() {
  const { user } = useUser();
  const { 
    subscription, 
    plans, 
    isLoading, 
    error: subscriptionError, 
    changePlan, 
    rechargeTokens, 
    reload 
  } = useSubscription();

  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentType, setPaymentType] = useState<'card' | 'mobile' | 'manual'>('card');
  const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>({
    paymentMethod: 'card',
    amount: '',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    mobileMoneyNumber: '',
    transactionId: '',
    proofScreenshot: null,
  });
  const [formError, setFormError] = useState('');
  const [tab, setTab] = useState<'plan' | 'payment' | 'options' | 'confirm'>('plan');
  const [showReceipt, setShowReceipt] = useState<PaymentRecord | null>(null);
  const receiptRef = useRef<ReceiptRef>(null);

  useEffect(() => {
    if (subscription) {
      setSelectedPlan(subscription.currentPlan);
    }
  }, [subscription]);

  // Plan virtuel pour la recharge
  const rechargePlanName = 'Recharge tokens';

  // Paiement
  async function handlePaymentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');

    const isRecharge = selectedPlan === rechargePlanName;

    if (isRecharge && (!paymentInfo.amount || isNaN(Number(paymentInfo.amount)) || Number(paymentInfo.amount) <= 0)) {
      setFormError('Veuillez saisir un montant valide pour la recharge.');
      return;
    }
    if (paymentType === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.cvv || !paymentInfo.expiryDate) {
        setFormError('Veuillez remplir tous les champs de la carte.');
        return;
      }
    } else if (paymentType === 'mobile') {
      if (!paymentInfo.mobileMoneyNumber || !paymentInfo.transactionId) {
        setFormError('Veuillez remplir tous les champs Mobile Money.');
        return;
      }
    } else if (paymentType === 'manual') {
      if (!paymentInfo.proofScreenshot) {
        setFormError('Veuillez charger une preuve de paiement.');
        return;
      }
    }
    try {
      if (isRecharge) {
        await rechargeTokens({ ...paymentInfo, paymentMethod: paymentType });
      } else {
        await changePlan(selectedPlan, paymentType);
      }
      setTab('confirm');
      reload(); // Recharger les données pour voir les changements
    } catch (err) {
      const error = err as Error;
      setFormError(error.message || 'Une erreur est survenue lors du paiement.');
    }
  }

  if (isLoading) {
    return <div className="text-center p-8">Chargement de votre abonnement...</div>;
  }

  if (subscriptionError) {
    return <div className="text-center p-8 text-red-600">Erreur: {subscriptionError}</div>;
  }

  if (!subscription) {
    return <div className="text-center p-8">Aucun abonnement trouvé.</div>;
  }

  const handleDownloadReceipt = () => {
    if (receiptRef.current) {
      receiptRef.current.downloadPDF();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Abonnement & Facturation</h1>
          <p className="text-gray-600 mt-1">Gérez votre plan, vos tokens et consultez votre historique de paiement.</p>
        </div>

        {/* Affichage du plan actuel et des tokens */}
        <div className="p-4 sm:p-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {user?.picture ? (
                            <img src={user.picture} alt="Profil" className="w-16 h-16 rounded-full object-cover border-2 border-white" />
                        ) : (
                            <UserCircle className="w-16 h-16 text-gray-300" />
                        )}
                        <div>
                            <div className="text-sm text-gray-500">Plan actuel</div>
                            <div className="text-xl font-bold text-primary">{subscription.currentPlan}</div>
                            <div className="text-sm text-gray-600">Géré par : <span className="font-semibold">{user?.name || 'Utilisateur'}</span></div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                                    Accès complet
                                </div>
                                <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                    Actif
                                </div>
                                <div className="inline-flex items-center gap-1 text-xs text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
                                    <span className="font-semibold">{subscription.tokenBalance.toLocaleString()}</span>
                                    <span className="ml-0.5">tokens</span>
                                    <button
                                        className="ml-2 text-primary hover:underline text-xs font-medium"
                                        onClick={() => {
                                            setSelectedPlan(rechargePlanName);
                                            setTab('payment');
                                        }}
                                    >
                                        Recharger
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center self-center sm:self-start mt-2 sm:mt-0">
                        <TokenRing 
                            tokenBalance={subscription.tokenBalance} 
                            tokenTotal={subscription.tokenTotal || 1000000}
                            size={80}
                            strokeWidth={5}
                            showLabels={true}
                            className="ml-auto" 
                        />
                    </div>
                </div>
            </div>
        </div>
            
        <div className="px-6 sm:px-8">
            {/* Navigation par onglets */}
            <div className="flex gap-2 border-b border-gray-200">
                <button
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${tab === 'plan' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
                onClick={() => setTab('plan')}
                >Changer de plan</button>
                <button
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${tab === 'payment' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
                onClick={() => setTab('payment')}
                >Paiement</button>
                <button
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${tab === 'options' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
                onClick={() => setTab('options')}
                >Options avancées</button>
            </div>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6 sm:p-8">
            {tab === 'plan' && (
                <PlanSelector plans={plans} currentPlan={subscription.currentPlan} onSelect={(plan) => { setSelectedPlan(plan); setTab('payment'); }} />
            )}
            {tab === 'payment' && (
                <PaymentPanel
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                error={formError}
                onSubmit={handlePaymentSubmit}
                paymentMethods={paymentMethods}
                selectedPlan={selectedPlan}
                plans={plans}
                />
            )}
            {tab === 'confirm' && (
                <div className="text-center py-12">
                <div className="text-2xl text-primary font-bold mb-2">Merci !</div>
                <div className="text-gray-700 mb-4">Votre paiement a été reçu. Votre abonnement sera mis à jour sous peu.</div>
                <button className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark" onClick={() => setTab('plan')}>Retour</button>
                </div>
            )}
            {tab === 'options' && <SubscriptionOptions />}
        </div>

        {/* Historique des paiements */}
        <div className="p-6 sm:p-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Historique des paiements</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm bg-white">
                <thead className="bg-gray-50">
                <tr >
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Date</th>
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Montant</th>
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Méthode</th>
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Plan</th>
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Statut</th>
                    <th className="px-4 py-3 font-semibold text-left text-gray-600">Reçu</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {subscription.paymentHistory.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{p.date}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">${p.amount}</td>
                    <td className="px-4 py-3 text-gray-700">{p.method}</td>
                    <td className="px-4 py-3 text-gray-700">{p.plan}</td>
                    <td className="px-4 py-3 text-gray-700"><span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{p.status}</span></td>
                    <td className="px-4 py-3">
                        <button className="text-primary hover:underline text-sm font-semibold" onClick={() => setShowReceipt(p)}>Afficher</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>

        {/* Modal de reçu */}
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowReceipt(null)}>
            <div className="bg-white rounded-xl max-w-4xl w-full relative m-4 flex flex-col" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h3 className="font-semibold text-lg">Reçu de paiement</h3>
                    <div className="flex items-center gap-2">
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors text-sm"
                            onClick={handleDownloadReceipt}
                        >
                            <Download size={14}/>
                            Télécharger (PDF)
                        </button>
                        <button className="text-gray-400 hover:text-primary" onClick={() => setShowReceipt(null)}>✕</button>
                    </div>
                </div>
                <div className="p-2 sm:p-4 overflow-y-auto">
                    <Receipt ref={receiptRef} payment={showReceipt} />
                </div>
            </div>
          </div>
        )}
    </div>
  );
}
