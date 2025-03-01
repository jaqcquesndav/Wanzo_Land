export type Currency = 'USD' | 'CDF';

const exchangeRate = 2500; // 1 USD = 2500 CDF

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'CDF') {
    amount = amount * exchangeRate;
  }
  
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'fr-CD', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}