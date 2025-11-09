import { api } from './api';
import type { Product, Category, ProductFilter } from '../types/product.types';
import type { ApiResponse, PaginationParams } from '../types/common.types';

interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productService = {
  async getProducts(
    params: PaginationParams & ProductFilter
  ): Promise<ProductResponse> {
    const response = await api.get<ProductResponse>('/products', { params });
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  async searchProducts(query: string, params?: PaginationParams): Promise<ProductResponse> {
    const response = await api.get<ProductResponse>(`/products/search`, {
      params: { query, ...params },
    });
    return response.data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  },
};