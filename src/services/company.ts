import { Company } from '../types/user';

// This mock data is the single source of truth for the company profile.
// It is shaped exactly as the UI components (OrganizationSummary, OrganizationFormModal) expect.
const mockCompany: Company = {
  id: 'comp-123',
  name: 'KIOTA TECH',
  logo: 'https://i.imgur.com/JfaStwU.png', // A more realistic placeholder logo
  description: 'Leader en solutions numériques innovantes en RDC, spécialisé dans le développement logiciel, le conseil technologique et la formation IT pour accélérer la transformation digitale des entreprises.',
  legalForm: 'SARL',
  industry: 'Technologie',
  size: '11-50 employés',
  website: 'https://www.kiota.tech',
  rccm: 'CD/KIN/RCCM/22-B-01234',
  taxId: 'A1234567B',
  natId: '01-2345-C67890D',
  address: {
    street: '123, Avenue de la Libération, Croisement Boulevard du 30 Juin',
    commune: 'Gombe',
    city: 'Kinshasa',
    province: 'Kinshasa',
    country: 'République Démocratique du Congo',
  },
  contacts: {
    email: 'contact@kiota.tech',
    phone: '+243 810 987 654',
    altPhone: '+243 990 123 456',
  },
  owner: {
    id: 'user-123',
    name: 'Jean Mutombo',
    email: 'j.mutombo@kiota.tech',
    phone: '+243 820 123 456',
  },
  associates: [
    {
      id: 'user-456',
      name: 'Marie Lukusa',
      role: 'Directrice financière',
      shares: 25,
      email: 'm.lukusa@kiota.tech',
      phone: '+243 821 234 567'
    },
    {
      id: 'user-789',
      name: 'Patrick Kabongo',
      role: 'Directeur technique',
      shares: 15,
      email: 'p.kabongo@kiota.tech',
      phone: '+243 822 345 678'
    }
  ],
  activities: {
    primary: 'Développement de logiciels et solutions numériques sur mesure.',
    secondary: [
      'Conseil en transformation digitale',
      'Formation professionnelle en IT',
      'Vente et intégration de matériel informatique',
    ],
  },
  capital: {
    isApplicable: true,
    amount: 50000,
    currency: 'USD',
  },
  financials: {
      revenue: 1200000,
      netIncome: 150000,
      totalAssets: 750000,
      equity: 400000,
  },
  affiliations: {
    cnss: '1234567-A',
    inpp: 'INPP/KIN/12345',
    onem: 'ONEM/KIN/67890',
    intraCoop: 'Groupe Innov-RDC',
    interCoop: 'Chambre de Commerce Franco-Congolaise',
    partners: ['Microsoft Partner Network', 'Google Cloud Partner'],
  },
  subscription: {
    plan: { name: 'Entreprise' },
    status: 'active',
    currentPeriodEnd: '2025-12-31',
  },
};

// The service now uses localStorage to persist changes, simulating a backend.
export class CompanyService {
  private getCompanyData(id: string = mockCompany.id): Company {
    const data = localStorage.getItem(`company_${id}`);
    if (data) {
      return JSON.parse(data);
    }
    // If no data in localStorage, initialize with mock data
    localStorage.setItem(`company_${id}`, JSON.stringify(mockCompany));
    return mockCompany;
  }

  private saveCompanyData(companyData: Company) {
    localStorage.setItem(`company_${companyData.id}`, JSON.stringify(companyData));
  }

  async getCompany(companyId: string): Promise<Company> {
    console.log(`Fetching company with id: ${companyId}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getCompanyData(companyId));
      }, 300);
    });
  }

  async updateCompany(companyId: string, data: Partial<Company>): Promise<Company> {
    console.log(`Updating company ${companyId} with`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = this.getCompanyData(companyId);
        const updatedData = { ...currentData, ...data };
        this.saveCompanyData(updatedData);
        resolve(updatedData);
      }, 300);
    });
  }

  async uploadLogo(companyId: string, file: File): Promise<{ url: string }> {
    console.log(`Uploading logo for company ${companyId}:`, file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newLogoUrl = reader.result as string;
          const currentData = this.getCompanyData(companyId);
          currentData.logo = newLogoUrl;
          this.saveCompanyData(currentData);
          resolve({ url: newLogoUrl });
        };
        reader.readAsDataURL(file);
      }, 500);
    });
  }

  async uploadOwnerCV(companyId: string, file: File): Promise<{ url: string }> {
    console.log(`Uploading CV for company ${companyId} owner:`, file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const cvUrl = reader.result as string;
          const currentData = this.getCompanyData(companyId);
          if (!currentData.owner) {
            currentData.owner = { id: '', name: '', cv: cvUrl };
          } else {
            currentData.owner.cv = cvUrl;
          }
          this.saveCompanyData(currentData);
          resolve({ url: cvUrl });
        };
        reader.readAsDataURL(file);
      }, 500);
    });
  }
}
