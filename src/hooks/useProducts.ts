import { useState, useEffect } from 'react';
import type { Product, ProductFilter } from '../types/product.types';
import { productService } from '../services/productServices';

export const useProducts = (filters: ProductFilter = {}, page = 1, pageSize = 12) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getProducts({
          ...filters,
          page,
          size: pageSize,
        });
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page, pageSize]);

  return { products, loading, error, totalPages };
};