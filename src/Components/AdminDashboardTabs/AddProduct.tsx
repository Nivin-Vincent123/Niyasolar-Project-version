import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";

// Product categories for the dropdown
const PRODUCT_CATEGORIES = [
  "Panels",
  "Kits",
  "Batteries",
  "Inverters",
  "Accessories"
];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [existingIds, setExistingIds] = useState<string[]>([]);
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // Track image upload status
  
  // Form state
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    brand: "Niya Solar", // Default brand
    wattage: "0" // Default wattage
  });
  
  // File upload state
  const [dragActive, setDragActive] = useState(false);


  // Load existing product IDs to prevent duplicates
  useEffect(() => {
    // Load IDs from Products.json
    const loadExistingIds = async () => {
      try {
        // Fetch from static JSON
        const response = await fetch('/src/Data/Products.json');
        const staticProducts = await response.json();
        
        // Get IDs from localStorage
        const localStorageProducts = JSON.parse(localStorage.getItem("products") || "[]");
        
        // Combine all IDs
        const allIds = [
          ...staticProducts.map((p: Product) => p.id),
          ...localStorageProducts.map((p: Product) => p.id)
        ];
        
        setExistingIds(allIds);
      } catch (err) {
        console.error("Error loading existing product IDs:", err);
      }
    };
    
    loadExistingIds();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types in the ID field
    if (name === "id" && error) {
      setError(null);
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  // Process the selected file
  const handleFile = (file: File) => {
    // Show local preview immediately
    const fileUrl = URL.createObjectURL(file);
    setImagePreview(fileUrl);
    setImageUploading(true);
    // Upload the file to server
    const formData = new FormData();
    formData.append('image', file);
    fetch('/api/upload', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {

        setForm(prev => ({ ...prev, image: data.imageUrl })); // Only save permanent URL
        setImagePreview(data.imageUrl); // Show uploaded image
        setImageUploading(false);
      })
      .catch(err => {
        console.error('Image upload failed:', err);
        setForm(prev => ({ ...prev, image: '' }));
        setImagePreview('');
        setImageUploading(false);
        alert('Failed to upload image. Please try again.');
      });
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    // Check for empty fields
    for (const [key, value] of Object.entries(form)) {
      if (value.trim() === "") {
        setError(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        return false;
      }
    }
    
    // Validate ID uniqueness
    if (existingIds.includes(form.id)) {
      setError("Product ID already exists. Please use a unique ID.");
      return false;
    }
    
    // Validate price and stock are positive numbers
    if (parseFloat(form.price) <= 0) {
      setError("Price must be a positive number");
      return false;
    }
    
    if (parseInt(form.stock) <= 0) {
      setError("Stock must be a positive number");
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUploading) {
      alert('Please wait for the image to finish uploading.');
      return;
    }
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    
    try {
      // Create product object
      const newProduct: Product = {
        id: form.id,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        category: form.category,
        image: form.image,
        brand: form.brand,
        wattage: parseInt(form.wattage)
      };

      
      // Get existing products from localStorage or initialize empty array
      const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
      
      // Add new product
      const updatedProducts = [...existingProducts, newProduct];
      
      // Save to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      
      // Set flag to distinguish between static and dynamic products
      localStorage.setItem("productSource", "dynamic");
      
      // Show success message
      setSuccess(true);
      
      // Option to redirect to product management
      setRedirectAfterSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        if (redirectAfterSuccess) {
          // Set active tab in session storage and navigate to dashboard
          sessionStorage.setItem("adminActiveTab", "products");
          navigate("/admin/dashboard");
        } else {
          // Just reset the form
          setForm({
            id: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            image: "",
            brand: "Niya Solar",
            wattage: "0"
          });
          setImagePreview("");
          setSuccess(false);
          
          // Add the new ID to existing IDs
          setExistingIds([...existingIds, form.id]);
        }
      }, 2000);
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Preview product before submitting
  const handlePreview = () => {
    if (!validateForm()) return;
    
    // You could implement a modal preview here
    alert(`Preview of ${form.name}:\n\nID: ${form.id}\nPrice: $${form.price}\nCategory: ${form.category}\nStock: ${form.stock} units`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Solar Product</h2>
      
      {/* Success message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Product added successfully.</span>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product ID */}
        <div>
          <label className="block text-gray-700 mb-1">Product ID*</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g., SP-001"
          />
        </div>
        
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 mb-1">Product Name*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g., Solar Panel 300W"
          />
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
            placeholder="Detailed product description..."
          />
        </div>
        
        {/* Price */}
        <div>
          <label className="block text-gray-700 mb-1">Price ($)*</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g., 299.99"
          />
        </div>
        
        {/* Stock */}
        <div>
          <label className="block text-gray-700 mb-1">Stock*</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="1"
            step="1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g., 50"
          />
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category*</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Wattage (optional but useful for solar products) */}
        <div>
          <label className="block text-gray-700 mb-1">Wattage (W)</label>
          <input
            type="number"
            name="wattage"
            value={form.wattage}
            onChange={handleChange}
            min="0"
            step="1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 300"
          />
        </div>
        
        {/* Image Upload with Drag & Drop */}
        <div>
          <label className="block text-gray-700 mb-1">Product Image*</label>
          <div 
            className={`relative border-2 border-dashed rounded-lg p-6 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              required={!form.image} // Required if no image is selected
            />
            
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 48 48" 
                aria-hidden="true"
              >
                <path 
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12m4-12h8m-4-4v8m0 0L32 32m-8-4v8m0 0v4m0-4h8m-4-4v8" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              
              <div className="flex justify-center mt-4">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-40 w-full object-contain rounded-lg border"
                  onError={() => setImagePreview("/images/placeholder.jpg")} 
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    setForm(prev => ({ ...prev, image: "" }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Hidden input to store the image URL/path */}
              <input 
                type="hidden" 
                name="image" 
                value={form.image} 
                required
              />
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading || imageUploading}
          >
            {loading ? "Adding..." : imageUploading ? "Uploading Image..." : "Add Product"}
          </button>
          
          <button
            type="button"
            onClick={handlePreview}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
