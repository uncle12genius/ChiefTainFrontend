export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: Category;
  brand: string;
  compatibility: string[];
  condition: 'NEW' | 'REFURBISHED' | 'USED';
  stock: number;
  ratings: number;
  reviewCount: number;
  specifications: Record<string, string>;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ProductFilter {
  categories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  conditions?: string[];
  compatibility?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}