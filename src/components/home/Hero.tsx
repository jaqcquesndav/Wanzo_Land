import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import '../../styles/hero-title.css';
import { Paperclip, Mic } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const demoInputs = [
  "J'ai vendu pour 100 000 FC à un client",
  "Paiement d'une facture fournisseur de 50 000 FC",
  "Versement de salaire à un employé",
  "Achat de fournitures de bureau pour 10 000 FC",
  "Paiement de la TVA sur achat"
];

const demoResponses = [
  {
    match: /facture.*client|vente/i,
    response: "Débit 411 Client, Crédit 701 Ventes."
  },
  {
    match: /achat|fournisseur/i,
    response: "Débit 607 Achats, Crédit 401 Fournisseur."
  },
  {
    match: /salaire|paiement.*salaire/i,
    response: "Débit 641 Salaires, Crédit 512 Banque."
  },
  {
    match: /tva/i,
    response: "Débit 44566 TVA déductible, Crédit 401 Fournisseur."
  },
  {
    match: /.*/,
    response: "Je suis Adha, votre IA comptable. Veuillez décrire une opération comptable en langage naturel !"
  }
];

// Helper to parse response into table rows if possible
function parseToTableRows(input: string, response: string) {
  // Simple heuristics for demo: look for 'Débit' and 'Crédit' and split
  const rows = [];
  const debitMatch = response.match(/Débit ([\d\w ]+),?/i);
  const creditMatch = response.match(/Crédit ([\d\w ]+),?/i);
  if (debitMatch || creditMatch) {
    rows.push({ type: 'Débit', compte: debitMatch ? debitMatch[1] : '', montant: '' });
    rows.push({ type: 'Crédit', compte: creditMatch ? creditMatch[1] : '', montant: '' });
    return rows;
  }
  return null;
}

// Floating tags data (uniform gray style)
const floatingTags = [
  "Écriture comptable simplifiée",
  "Reconciliation bancaire automatisée",
  "Assistance optimale",
  "Facturation",
  "Inventaire",
  "Gestion de portefeuille",
  "Analyse de risque",
  "Espace institution financière",
  "Prospection & financement",
  "ERP tout-en-un PME"
];

export function Hero() {
  const [autoInput, setAutoInput] = useState("");
  const [demoIndex, setDemoIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [messages, setMessages] = useState<{input: string, response: string}[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Typing and auto-send effect
  useEffect(() => {
    if (charIndex < demoInputs[demoIndex].length) {
      typingTimeout.current = setTimeout(() => {
        setAutoInput(demoInputs[demoIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
    } else {
      // Simulate send after typing
      typingTimeout.current = setTimeout(() => {
        const input = demoInputs[demoIndex];
        const found = demoResponses.find(r => r.match.test(input));
        setMessages(msgs => [...msgs, { input, response: found ? found.response : demoResponses[demoResponses.length - 1].response }]);
        setCharIndex(0);
        setDemoIndex((demoIndex + 1) % demoInputs.length);
        setAutoInput("");
      }, 2200); // slower frequency
    }
    return () => { if (typingTimeout.current) clearTimeout(typingTimeout.current); };
  }, [charIndex, demoIndex]);

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      {/* Remove top SVG curve for a flat top */}
      {/* <svg className="absolute top-0 left-0 w-full h-32 z-0" ... /> */}
      <svg className="absolute top-0 left-0 w-full h-24 z-0" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,48 C480,96 960,0 1440,48 L1440,0 L0,0 Z" fill="#f3f4f6" />
      </svg>
      <Container className="relative z-10 py-20 lg:py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="min-h-[160px] mt-16 flex justify-center relative" style={{ minHeight: 160 }}>
              <h1
                className="hero-title-special text-4xl font-bold text-gray-900 sm:text-6xl mb-0 relative z-20"
                style={{
                  fontFamily: 'Permanent Marker, Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.1,
                  textTransform: 'none'
                }}
              >
                la plateforme pour gérer et financer votre PME
              </h1>
            </div>
            <div className="mt-4 flex justify-center">
              <span
                className="block w-24 h-1 rounded-full bg-primary opacity-80"
                style={{
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
            <div className="mt-8 flex justify-center relative" style={{ minHeight: 120 }}>
              <div className="w-full max-w-xs relative z-20">
                <div className="relative flex items-center bg-white border rounded-full shadow px-2 py-1 animate-pulse transition-all duration-300 min-h-[38px]">
                  <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors" tabIndex={-1} aria-label="Micro non-fonctionnel">
                    <Mic className="w-5 h-5" />
                  </button>
                  <textarea
                    className="flex-1 border-0 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-0 placeholder-gray-400 resize-none overflow-hidden min-h-[20px] max-h-32"
                    placeholder="Décrivez une opération comptable..."
                    value={autoInput}
                    readOnly
                    rows={1}
                    style={{ minWidth: 0, height: `${Math.max(20, autoInput.split('\n').length * 20)}px` }}
                  />
                  <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors" tabIndex={-1} aria-label="Pièce jointe non-fonctionnelle">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                {/* Résultat IA juste en dessous */}
                <div className="mt-2 space-y-2 text-center text-xs">
                  {messages.length > 0 && (
                    <div className="text-gray-500 inline-block">{messages[messages.length-1].input}</div>
                  )}
                  {messages.length > 0 && (() => {
                    const last = messages[messages.length-1];
                    const tableRows = parseToTableRows(last.input, last.response);
                    if (tableRows) {
                      return (
                        <div className="overflow-x-auto flex justify-center">
                          <table className="min-w-[180px] text-xs border border-gray-200 bg-white rounded-md mx-auto">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-2 py-1 border-b text-left">Type</th>
                                <th className="px-2 py-1 border-b text-left">Compte</th>
                                <th className="px-2 py-1 border-b text-left">Montant</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableRows.map((row, i) => (
                                <tr key={i}>
                                  <td className="px-2 py-1 border-b">{row.type}</td>
                                  <td className="px-2 py-1 border-b">{row.compte}</td>
                                  <td className="px-2 py-1 border-b text-gray-300 italic">{row.montant || '...'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return (
                      <div className="bg-gray-100 rounded-xl px-3 py-2 text-gray-800 border inline-block max-w-full mx-auto">
                        {last.response}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* Uniform gray tags below the input/results */}
            <div className="relative flex flex-wrap justify-center gap-2 mt-8 mb-2 z-10" style={{ minHeight: 40 }}>
              {floatingTags.map((label, i) => (
                <span
                  key={i}
                  className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium select-none pointer-events-none border border-gray-300"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}