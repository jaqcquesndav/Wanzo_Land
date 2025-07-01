import { PricingPlan, PaymentRecord, SubscriptionData, PaymentDetails } from '../types/user';
import { plans as appPlans } from '../components/home/Pricing'; // Import plans from the UI source

// Helper to create a consistent mock user ID
const MOCK_USER_ID = 'user_auth0_mock_id';

// Simulate a simple database for subscription and payment history
let mockSubscriptionData: SubscriptionData = {
  id: 'sub_12345',
  userId: MOCK_USER_ID,
  currentPlan: 'PME', // Matches the default in the UI
  tokenBalance: 50000,
  tokenTotal: 100000,
  paymentHistory: [
    { id: 'PAY-001', date: '2025-06-01', amount: 19.9, method: 'Carte bancaire', plan: 'PME', status: 'Payé', receiptUrl: '#' },
    { id: 'PAY-002', date: '2025-05-01', amount: 19.9, method: 'Mobile Money', plan: 'PME', status: 'Payé', receiptUrl: '#' },
    { id: 'PAY-003', date: '2025-04-01', amount: 5, method: 'Carte bancaire', plan: 'Recharge tokens', status: 'Payé', receiptUrl: '#' },
  ],
};

// The available plans are derived from the UI component source
const getMockPlans = (): PricingPlan[] => {
    const rechargePlan: PricingPlan = {
        name: 'Recharge tokens',
        description: 'Achetez des tokens à la demande',
        price: '', // Price is dynamic for recharges
        features: [],
    };
    const basePlans = appPlans.filter(p => !/recharge|token/i.test(p.name));
    return [...basePlans, rechargePlan];
};


const subscriptionService = {
  /**
   * MOCKED: Fetches the user's current subscription status, token balance, and payment history.
   */
  async getSubscriptionData(userId: string): Promise<SubscriptionData> {
    console.log(`Fetching subscription data for user ${userId}`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...mockSubscriptionData });
      }, 500);
    });
  },

  /**
   * MOCKED: Fetches the available subscription plans.
   */
  async getAvailablePlans(): Promise<PricingPlan[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getMockPlans());
      }, 300);
    });
  },

  /**
   * MOCKED: Changes the user's subscription plan and creates a payment record.
   */
  async changePlan(userId: string, newPlanId: string, paymentMethod: 'card' | 'mobile' | 'manual'): Promise<SubscriptionData> {
    console.log(`Changing plan for user ${userId} to ${newPlanId}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const planDetails = getMockPlans().find(p => p.name === newPlanId);
        if (!planDetails) {
          return reject(new Error('Plan not found'));
        }

        mockSubscriptionData.currentPlan = newPlanId;
        const newPayment: PaymentRecord = {
            id: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toISOString().split('T')[0],
            amount: Number(planDetails.price) || 0,
            method: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
            plan: newPlanId,
            status: 'Payé',
            receiptUrl: '#',
        };
        mockSubscriptionData.paymentHistory.unshift(newPayment);
        
        resolve({ ...mockSubscriptionData });
      }, 500);
    });
  },

  /**
   * MOCKED: Recharges tokens and creates a payment record.
   */
  async rechargeTokens(userId: string, paymentDetails: PaymentDetails): Promise<SubscriptionData> {
    console.log(`Recharging tokens for user ${userId}`, paymentDetails);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const amountPaid = Number(paymentDetails.amount);
        if (isNaN(amountPaid) || amountPaid <= 0) {
            return reject(new Error('Invalid payment amount'));
        }

        // Simple conversion: 1,000,000 tokens per $5
        const tokensGained = Math.floor((amountPaid / 5) * 1_000_000);
        mockSubscriptionData.tokenBalance += tokensGained;
        mockSubscriptionData.tokenTotal += tokensGained;

        const newPayment: PaymentRecord = {
            id: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toISOString().split('T')[0],
            amount: amountPaid,
            method: paymentDetails.paymentMethod.charAt(0).toUpperCase() + paymentDetails.paymentMethod.slice(1),
            plan: 'Recharge tokens',
            status: 'Payé',
            receiptUrl: '#',
        };
        mockSubscriptionData.paymentHistory.unshift(newPayment);

        resolve({ ...mockSubscriptionData });
      }, 500);
    });
  },
};

export default subscriptionService;
