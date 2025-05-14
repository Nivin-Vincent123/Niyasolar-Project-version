

// import BookCard from "../BookCard";

// interface DealBook {
//   id: string;
//   title: string;
//   author: string;
//   description: string;
//   genre: string;
//   coverImage: string;
//   price: number;
//   discountPercentage: number;
//   originalPrice: number;
//   rating?: number;
// }

// const Deals: React.FC = () => {
//   const [deals] = useState<DealBook[]>(
//     booksData
//       .map((book) => ({
//         ...book,
//         discountPercentage: Math.floor(Math.random() * 30) + 20, // Random discount between 20-50%
//         originalPrice: book.price,
//         price: 0,
//         rating: Math.random() * 2 + 3.5, // Random rating between 3.5-5.5
//       }))
//       .map((book) => ({
//         ...book,
//         price: +(
//           book.originalPrice *
//           (1 - book.discountPercentage / 100)
//         ).toFixed(2),
//       }))
//   );

//   const [filter, setFilter] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const filterDeals = (type: string) => {
//     setFilter(type);
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 500);
//   };

//   const filteredDeals = deals.filter((deal) => {
//     if (filter === "all") return true;
//     if (filter === "bestsellers")
//       return deal.rating ? deal.rating >= 4.5 : false;
//     if (filter === "under10") return deal.price < 10;
//     if (filter === "biggest") return deal.discountPercentage >= 40;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-[#0a0a1a] text-gray-100 py-12 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center mb-12 animate-fadeIn">
//           <h1 className="text-5xl font-bold text-[#00ffff] mb-6 font-['Orbitron'] drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
//             Special Deals & Offers
//           </h1>
//           <p className="text-xl text-[#00ffff]/80 max-w-2xl mx-auto">
//             Discover amazing discounts on your favorite books. Limited time
//             offers updated daily!
//           </p>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {[
//             { id: "all", label: "All Deals" },
//             { id: "bestsellers", label: "Bestseller Deals" },
//             { id: "under10", label: "Under $10" },
//             { id: "biggest", label: "Biggest Discounts" },
//           ].map((button) => (
//             <button
//               key={button.id}
//               onClick={() => filterDeals(button.id)}
//               className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105
//                 ${
//                   filter === button.id
//                     ? "bg-[#00ffff] text-[#0a0a1a] shadow-[0_0_20px_rgba(0,255,255,0.3)]"
//                     : "bg-[#000033] text-[#00ffff] border border-[#00ffff]/30 hover:border-[#00ffff]"
//                 }`}
//             >
//               {button.label}
//             </button>
//           ))}
//         </div>

//         {/* Deals Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {isLoading
//             ? // Loading Skeleton
//               [...Array(8)].map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-[#000033] rounded-xl h-96"></div>
//                 </div>
//               ))
//             : filteredDeals.map((book) => (
//                 <div
//                   key={book.id}
//                   className="group relative bg-[#000033] rounded-xl p-4 transition-all duration-300 
//                   transform hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,255,255,0.2)]
//                   animate-fadeIn"
//                 >
//                   <div
//                     className="absolute -top-3 -right-3 bg-[#ff0000] text-white px-4 py-2 rounded-lg
//                   transform rotate-12 shadow-lg z-10"
//                   >
//                     -{book.discountPercentage}%
//                   </div>
//                   <BookCard book={book} />
//                   <div className="mt-4 text-center">
//                     <span className="text-gray-400 line-through">
//                       ${book.originalPrice}
//                     </span>
//                     <span className="text-[#00ffff] text-xl font-bold ml-2">
//                       ${book.price}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//         </div>

//         {/* Newsletter Section */}
//         <div
//           className="mt-20 bg-gradient-to-r from-[#000033] to-[#000066] rounded-2xl p-8 text-center
//           transform hover:scale-[1.02] transition-all duration-300"
//         >
//           <h2 className="text-3xl font-bold text-[#00ffff] mb-4">
//             Never Miss a Deal!
//           </h2>
//           <p className="text-[#00ffff]/80 mb-6">
//             Subscribe to our newsletter and get notified about exclusive deals
//             and discounts.
//           </p>
//           <div className="flex max-w-md mx-auto gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 bg-white/5 border border-[#00ffff]/30 rounded-lg
//                 focus:ring-2 focus:ring-[#00ffff] focus:outline-none text-white"
//             />
//             <button
//               className="px-6 py-3 bg-[#00ffff] text-[#0a0a1a] rounded-lg font-semibold
//               hover:bg-[#00cccc] transition-colors duration-300"
//             >
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Deals;
