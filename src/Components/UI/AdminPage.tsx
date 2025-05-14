import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { FormErrors } from "../../types/formErrors";
import { ProductsApi } from "../Api/Products";
// import axios from 'axios';

const AdminPage = () => {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    brand: "",
    description: "",
    image: "",
    category: "",
    wattage: 0,
    price: 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'wattage' || name === 'price' ? Number(value) : value,
    });
  };

  useEffect(() => {
    // Cleanup image preview URL when component unmounts or when preview changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Upload image to server
        const response = await ProductsApi.uploadImage(formData);
        setProduct({
          ...product,
          image: response.imageUrl,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.brand.trim()) newErrors.brand = 'Brand is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (product.wattage <= 0) newErrors.wattage = 'Wattage must be greater than 0';
    if (product.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!product.image) newErrors.image = 'Product image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await ProductsApi.addProduct(product);
      alert('Product added successfully!');
      // Reset form
      setProduct({
        id: '',
        name: '',
        brand: '',
        description: '',
        image: '',
        category: '',
        wattage: 0,
        price: 0,
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="wattage" className="block text-sm font-medium text-gray-700">
              Wattage
            </label>
            <input
              type="number"
              id="wattage"
              name="wattage"
              value={product.wattage}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.wattage && <p className="mt-1 text-sm text-red-600">{errors.wattage}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full max-w-xs mx-auto rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
