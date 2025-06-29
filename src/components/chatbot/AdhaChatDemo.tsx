import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const demoResponses = [
  {
    match: /facture.*client|vente/i,
    response: "Voici l'écriture comptable :\nDébit 411 Client, Crédit 701 Ventes."
  },
  {
    match: /achat|fournisseur/i,
    response: "Voici l'écriture comptable :\nDébit 607 Achats, Crédit 401 Fournisseur."
  },
  {
    match: /salaire|paiement.*salaire/i,
    response: "Voici l'écriture comptable :\nDébit 641 Salaires, Crédit 512 Banque."
  },
  {
    match: /tva/i,
    response: "Voici l'écriture comptable :\nDébit 44566 TVA déductible, Crédit 401 Fournisseur."
  },
  {
    match: /.*/,
    response: "Je suis Adha, votre IA comptable. Veuillez décrire une opération comptable en langage naturel !"
  }
];

export default function AdhaChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    // Simulate AI response
    setTimeout(() => {
      const found = demoResponses.find(r => r.match.test(input));
      setMessages(msgs => [
        ...msgs,
        { sender: 'ai', text: found ? found.response : demoResponses[demoResponses.length - 1].response }
      ]);
    }, 600);
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg shadow bg-white flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-20">Essayez : "J'ai vendu pour 100 000 FC à un client"</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <span className={
              msg.sender === 'user'
                ? 'inline-block bg-primary text-white rounded-2xl px-4 py-2 mb-1'
                : 'inline-block bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 mb-1'
            }>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-gray-50">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring"
          placeholder="Décrivez une opération comptable..."
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-full px-6 py-2 font-semibold hover:bg-primary-hover transition"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
