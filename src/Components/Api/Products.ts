import axios from 'axios';
import { Product } from '../types/Product';
import ProductsData from '../../data/Products.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const ProductsApi = {
  // Add a new product
  addProduct: async (product: Product): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/api/products`, product);
    return response.data;
  },

  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      // Merge with localStorage products by id
      let localProducts: Product[] = [];
      try {
        localProducts = JSON.parse(localStorage.getItem("products") || "[]");
      } catch {
        localProducts = [];
      }
      const apiProducts: Product[] = response.data;
      const merged = [
        ...apiProducts.map(sp => {
          const override = localProducts.find(lp => lp.id === sp.id);
          return override ? { ...sp, ...override } : sp;
        }),
        ...localProducts.filter(lp => !apiProducts.some(sp => sp.id === lp.id))
      ];
      return merged;
    } catch (error) {
      // Fallback to static JSON
      let staticProducts: Product[] = ProductsData;
      let localProducts: Product[] = [];
      try {
        localProducts = JSON.parse(localStorage.getItem("products") || "[]");
      } catch {
        localProducts = [];
      }
      const merged = [
        ...staticProducts.map(sp => {
          const override = localProducts.find(lp => lp.id === sp.id);
          return override ? { ...sp, ...override } : sp;
        }),
        ...localProducts.filter(lp => !staticProducts.some(sp => sp.id === lp.id))
      ];
      return merged;
    }
  },

  // Get a single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    return response.data;
  },

  // Update a product
  updateProduct: async (id: string, product: Product): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/api/products/${id}`, product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/api/products/${id}`);
  },

  // Upload product image
  uploadImage: async (formData: FormData): Promise<{ imageUrl: string }> => {
    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
