import { useState, useEffect, useCallback } from 'react';
import { SubscriptionData, PricingPlan, PaymentDetails } from '../types/user';
import subscriptionService from '../services/subscription';

// Helper to create a consistent mock user ID, mirroring the service
const MOCK_USER_ID = 'user_auth0_mock_id';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptionData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Pass the mock user ID to the service
      const data = await subscriptionService.getSubscriptionData(MOCK_USER_ID);
      setSubscription(data);
      setError(null);
    } catch (err) {
        const error = err as Error;
        setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPlans = useCallback(async () => {
    try {
      const availablePlans = await subscriptionService.getAvailablePlans();
      setPlans(availablePlans);
    } catch (err) {
        const error = err as Error;
        setError(error.message);
    }
  }, []);

  useEffect(() => {
    loadSubscriptionData();
    loadPlans();
  }, [loadSubscriptionData, loadPlans]);

  const changePlan = async (newPlanId: string, paymentMethod: 'card' | 'mobile' | 'manual') => {
    if (!subscription) return;
    try {
      setIsLoading(true);
      const updatedSubscription = await subscriptionService.changePlan(subscription.userId, newPlanId, paymentMethod);
      setSubscription(updatedSubscription);
      setError(null);
    } catch (err) {
        const error = err as Error;
        setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const rechargeTokens = async (paymentDetails: PaymentDetails) => {
    if (!subscription) return;
    try {
      setIsLoading(true);
      const updatedSubscription = await subscriptionService.rechargeTokens(subscription.userId, paymentDetails);
      setSubscription(updatedSubscription);
      setError(null);
    } catch (err) {
        const error = err as Error;
        setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscription,
    plans,
    isLoading,
    error,
    changePlan,
    rechargeTokens,
    reload: loadSubscriptionData,
  };
};
