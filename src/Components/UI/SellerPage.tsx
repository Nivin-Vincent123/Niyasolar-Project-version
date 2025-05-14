


// // SellerPage component removed
//   const [formData, setFormData] = useState({
//     bookTitle: "",
//     author: "",
//     description: "",
//     price: "",
//     genre: "",
//     condition: "new",
//     image: null as File | null,
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData((prev) => ({
//         ...prev,
//         image: e.target.files![0],
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen bg-[#f0f0f0] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl w-full">
//         <div className="bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-8">
//           <h1 className="text-5xl font-bold text-[#333333] mb-8 text-center">
//             Seller Page
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="bg-[#f9f9f9] p-6 rounded-lg">
//               <label
//                 htmlFor="bookTitle"
//                 className="block text-[#333333] mb-2 text-xl"
//               >
//                 Book Title
//               </label>
//               <input
//                 type="text"
//                 id="bookTitle"
//                 name="bookTitle"
//                 value={formData.bookTitle}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                 required
//               />
//             </div>

//             <div className="bg-[#f9f9f9] p-6 rounded-lg">
//               <label
//                 htmlFor="author"
//                 className="block text-[#333333] mb-2 text-xl"
//               >
//                 Author
//               </label>
//               <input
//                 type="text"
//                 id="author"
//                 name="author"
//                 value={formData.author}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                 required
//               />
//             </div>

//             <div className="bg-[#f9f9f9] p-6 rounded-lg">
//               <label
//                 htmlFor="description"
//                 className="block text-[#333333] mb-2 text-xl"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={6}
//                 className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-[#f9f9f9] p-6 rounded-lg">
//                 <label
//                   htmlFor="price"
//                   className="block text-[#333333] mb-2 text-xl"
//                 >
//                   Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                   required
//                 />
//               </div>

//               <div className="bg-[#f9f9f9] p-6 rounded-lg">
//                 <label
//                   htmlFor="genre"
//                   className="block text-[#333333] mb-2 text-xl"
//                 >
//                   Genre
//                 </label>
//                 <select
//                   id="genre"
//                   name="genre"
//                   value={formData.genre}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                   required
//                 >
//                   <option value="">Select a genre</option>
//                   <option value="fiction">Fiction</option>
//                   <option value="non-fiction">Non-Fiction</option>
//                   <option value="mystery">Mystery</option>
//                   <option value="sci-fi">Science Fiction</option>
//                   <option value="fantasy">Fantasy</option>
//                   <option value="romance">Romance</option>
//                 </select>
//               </div>
//             </div>

//             <div className="bg-[#f9f9f9] p-6 rounded-lg">
//               <label
//                 htmlFor="condition"
//                 className="block text-[#333333] mb-2 text-xl"
//               >
//                 Book Condition
//               </label>
//               <select
//                 id="condition"
//                 name="condition"
//                 value={formData.condition}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                 required
//               >
//                 <option value="new">New</option>
//                 <option value="like-new">Like New</option>
//                 <option value="good">Good</option>
//                 <option value="fair">Fair</option>
//               </select>
//             </div>

//             <div className="bg-[#f9f9f9] p-6 rounded-lg">
//               <label
//                 htmlFor="image"
//                 className="block text-[#333333] mb-2 text-xl"
//               >
//                 Book Cover Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 onChange={handleImageUpload}
//                 accept="image/*"
//                 className="w-full px-4 py-3 rounded-lg bg-[#ffffff] text-gray-800 border border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#333333]"
//                 required
//               />
//             </div>

//             <div className="flex justify-center pt-6">
//               <button
//                 type="submit"
//                 className="px-10 py-4 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-[#ffffff] rounded-xl font-bold hover:from-[#ff5252] hover:to-[#ffc107] transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,107,107,0.4)] text-2xl"
//               >
//                 List Book for Sale
//               </button>
//             </div>
//           </form>

//           <div className="mt-8 text-center">
//             <Link
//               to="/"
//               className="text-[#333333] hover:text-[#666666] transition duration-300 text-xl"
//             >
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // SellerPage export removed
