export interface Product {
  gallery: never[];
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  monthlyPayment: number;
  category: string;
  subcategory: string;
  condition: string;
  brand?: string;
  specifications?: Record<string, string | number>;
  availableFinancing?: string[];
  availableDurations?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
}