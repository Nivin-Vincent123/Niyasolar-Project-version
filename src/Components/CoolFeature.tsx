// import React from "react";
// import { Book } from "./types/Product";
// import { Button } from "@/Components/UI/button";
// import { ShoppingCart } from "lucide-react";
// import { addItemToCart } from "./ShoppingCart";

// // Sample data - in a real app, this would come from an API
// const sampleBooks: Book[] = [
//   {
//     id: "1",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     price: 9.99,
//     coverImage: "https://example.com/gatsby.jpg",
//     description: "A story of decadence and excess...",
//     genre: "Literary Fiction",
//   },
//   {
//     id: "2",
//     title: "1984",
//     author: "George Orwell",
//     price: 12.99,
//     coverImage: "https://example.com/1984.jpg",
//     description: "A dystopian social science fiction...",
//     genre: "Science Fiction",
//   },
//   // Add more sample books as needed
// ];

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-4 md:p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Welcome to BookStore
//           </h1>
//           <Button variant="outline" asChild>
//             <a href="/cart" className="flex items-center gap-2">
//               <ShoppingCart className="w-5 h-5" />
//               View Cart
//             </a>
//           </Button>
//         </div>

//         {/* Featured Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-semibold mb-4">Featured Books</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {sampleBooks.map((book) => (
//               <div
//                 key={book.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <img
//                   src={book.coverImage}
//                   alt={book.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     // Fallback for broken images
//                     (e.target as HTMLImageElement).src =
//                       "https://via.placeholder.com/400x600?text=Book+Cover";
//                   }}
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {book.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-2">By {book.author}</p>
//                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                     {book.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-lg font-bold text-gray-900">
//                       ${book.price.toFixed(2)}
//                     </span>
//                     <Button
//                       onClick={() => addItemToCart(book)}
//                       variant="default"
//                       className="bg-blue-500 hover:bg-blue-600"
//                     >
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Categories Section */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               "Fiction",
//               "Non-Fiction",
//               "Science",
//               "History",
//               "Biography",
//               "Technology",
//               "Art",
//               "Philosophy",
//             ].map((category) => (
//               <Button
//                 key={category}
//                 variant="outline"
//                 className="h-24 text-lg font-medium"
//               >
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
