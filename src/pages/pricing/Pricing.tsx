import { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { PageContainer } from '../../components/layout/PageContainer';
import { PricingTabs } from './components/PricingTabs';
import { PricingPlans } from './components/PricingPlans';
import { PricingFAQ } from './components/PricingFAQ';
import { PricingComparison } from './components/PricingComparison';
import { EnterpriseContact } from './components/EnterpriseContact';
import { CurrencyToggle } from '../../components/pricing/CurrencyToggle';
import { BillingToggle } from '../../components/pricing/BillingToggle';
import type { Currency } from '../../utils/currency';
import type { BillingPeriod } from '../../components/pricing/BillingToggle';

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [selectedTab, setSelectedTab] = useState<'management' | 'financing'>('management');

  return (
    <PageContainer>
      <div className="bg-gradient-to-b from-indigo-50/50">
        <Container className="py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des tarifs adaptés à vos besoins
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choisissez le plan qui correspond le mieux à votre entreprise
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <BillingToggle 
              period={billingPeriod} 
              onChange={setBillingPeriod} 
            />
            <CurrencyToggle 
              currency={currency} 
              onChange={setCurrency} 
            />
          </div>

          <div className="mt-12">
            <PricingTabs
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />

            <div className="mt-8">
              <PricingPlans
                type={selectedTab}
                currency={currency}
                billingPeriod={billingPeriod}
              />
            </div>
          </div>

          <div className="mt-24 space-y-24">
            <PricingComparison type={selectedTab} />
            <PricingFAQ />
            <EnterpriseContact />
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}