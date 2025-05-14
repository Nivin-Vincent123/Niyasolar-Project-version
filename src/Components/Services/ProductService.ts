import { Product } from '../types/Product';

const BASE_URL = 'http://localhost:5000/api/products';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addProduct = async (product: Product): Promise<Product> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error('Failed to add product');
  }

  return res.json();
};
