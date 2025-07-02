import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getFinancialInstitution, createFinancialInstitution, updateFinancialInstitution } from '@/services/financialInstitution';
import { useUser } from '@/hooks/useUser';
import { FinancialInstitution, FinancialInstitutionType } from '@/types/financialInstitution';

const institutionTypes: readonly FinancialInstitutionType[] = [
  'BANQUE', 
  'MICROFINANCE', 
  'COOPEC', 
  'FOND_GARANTIE',
  'ENTREPRISE_FINANCIERE',
  'FOND_CAPITAL_INVESTISSEMENT',
  'FOND_IMPACT',
  'AUTRE'
] as const;

// Define Zod schema for multi-step form validation
const step1Schema = z.object({
  name: z.string().min(1, "Le nom de l'institution est requis"),
  type: z.enum(['BANQUE', 'MICROFINANCE', 'COOPEC', 'FOND_GARANTIE', 'ENTREPRISE_FINANCIERE', 'FOND_CAPITAL_INVESTISSEMENT', 'FOND_IMPACT', 'AUTRE'], { 
    errorMap: () => ({ message: "Le type d'institution est requis" }) 
  }),
  sector: z.enum(['PRIVE', 'PUBLIC', 'PUBLIC_PRIVE']).optional(),
});

const step2Schema = z.object({
  address: z.string().min(1, 'L\'adresse est requise'),
  city: z.string().min(1, 'La ville est requise'),
  country: z.string().min(1, 'Le pays est requis'),
});

const step3Schema = z.object({
  phone: z.string().min(1, 'Le téléphone est requis'),
  email: z.string().email('L\'email est invalide'),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FinancialInstitutionFormData = z.infer<typeof fullSchema>;

interface Props {
  institutionId?: string;
  onSuccess?: () => void;
}

const FinancialInstitutionForm: React.FC<Props> = ({ institutionId, onSuccess }) => {
  const [step, setStep] = useState(1);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinancialInstitutionFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      country: 'RDC', // Default country
    }
  });

  useEffect(() => {
    if (institutionId) {
      const fetchInstitution = async () => {
        try {
          const data = await getFinancialInstitution(institutionId);
          if (data) {
            reset(data);
          }
        } catch (error) {
          console.error('Failed to fetch institution data:', error);
        }
      };
      fetchInstitution();
    }
  }, [institutionId, reset]);

  const onSubmit = async (data: FinancialInstitutionFormData) => {
    if (!user) {
      console.error('User not found, cannot submit form.');
      return;
    }

    try {
      if (institutionId) {
        await updateFinancialInstitution(institutionId, data as Partial<FinancialInstitution>);
      } else {
        await createFinancialInstitution({ ...data, userId: user.id });
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, display an error message to the user
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {step === 1 && (
        <div>
          <h2 className="text-lg font-medium">Étape 1: Informations de base</h2>
          <div className="mt-4">
            <label htmlFor="name">Nom de l'institution</label>
            <input id="name" {...register('name')} className="w-full p-2 border rounded" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="type">Type d'institution</label>
            <select id="type" {...register('type')} className="w-full p-2 border rounded">
              <option value="">Sélectionner un type</option>
              {institutionTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace('_', ' ')}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="sector">Secteur</label>
            <select id="sector" {...register('sector')} className="w-full p-2 border rounded">
              <option value="">Sélectionner un secteur</option>
              <option value="PRIVE">Privé</option>
              <option value="PUBLIC">Public</option>
              <option value="PUBLIC_PRIVE">Public-Privé</option>
            </select>
            {errors.sector && <p className="text-red-500">{errors.sector.message}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-medium">Étape 2: Adresse</h2>
          <div className="mt-4">
            <label htmlFor="address">Adresse</label>
            <input id="address" {...register('address')} className="w-full p-2 border rounded" />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="city">Ville</label>
            <input id="city" {...register('city')} className="w-full p-2 border rounded" />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="country">Pays</label>
            <input id="country" {...register('country')} className="w-full p-2 border rounded" />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-medium">Étape 3: Contact</h2>
          <div className="mt-4">
            <label htmlFor="phone">Téléphone</label>
            <input id="phone" {...register('phone')} className="w-full p-2 border rounded" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input id="email" {...register('email')} className="w-full p-2 border rounded" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Précédent
          </button>
        )}
        {step < 3 && (
          <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
            Suivant
          </button>
        )}
        {step === 3 && (
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded" disabled={isSubmitting}>
            {isSubmitting ? 'Soumission...' : 'Soumettre'}
          </button>
        )}
      </div>
    </form>
  );
};

export default FinancialInstitutionForm;
