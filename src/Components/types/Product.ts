export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  category: string; // e.g., Solar Panel, Solar Battery, etc.
  wattage: number; // e.g., 250W, 500W, etc.
  price: number; // Price of the product
  stock?: number; // Number of available items
}
