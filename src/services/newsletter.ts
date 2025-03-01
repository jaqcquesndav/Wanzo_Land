import { supabase } from '../lib/supabase';

export interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
  status: 'active' | 'unsubscribed';
}

export const newsletterService = {
  async subscribe(email: string): Promise<NewsletterSubscription> {
    // Vérifier si l'email existe déjà
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select()
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Réactiver l'abonnement
        const { data, error } = await supabase
          .from('newsletter_subscriptions')
          .update({ status: 'active' })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
      return existing;
    }

    // Créer un nouvel abonnement
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        { 
          email,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unsubscribe(email: string): Promise<void> {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('email', email);

    if (error) throw error;
  },
};