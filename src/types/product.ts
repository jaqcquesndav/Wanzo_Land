export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  price: number;
  monthlyPayment: number;
  category: string;
  subcategory: string;
  condition: string;
  brand?: string;
  specifications: Record<string, string | number | undefined>;
  availableFinancing?: string[];
  availableDurations?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
}