import { useState } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './useToast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const { showToast } = useToast();

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      showToast({
        title: 'Connexion requise',
        message: 'Veuillez vous connecter pour ajouter des articles au panier',
        type: 'error'
      });
      window.location.href = 'https://auth.kiota.com/login';
      return;
    }

    setItems(current => {
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        return current.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });

    showToast({
      title: 'Article ajouté',
      message: 'L\'article a été ajouté à votre panier',
      type: 'success'
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(current => current.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };
}