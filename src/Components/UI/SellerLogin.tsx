


// // SellerLogin component removed
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here

//     // Notify user of successful login
//     alert('Login successful! Redirecting to Seller Page...');
//     // Redirect to SellerPage after successful login
//     navigate('/sellerpage');
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-5xl font-bold text-[#00ffff] font-['Orbitron'] tracking-wider mb-2">
//             BookBee
//           </h2>
//           <p className="text-xl text-gray-400 font-['Poppins']">Seller Portal</p>
//         </div>

//         <div className="bg-[#1a1a2a] rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.15)] p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-[#00ffff] mb-2 font-['Poppins']">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-[#00ffff] mb-2 font-['Poppins']">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="h-4 w-4 rounded border-[#00ffff] text-[#00ffff] focus:ring-[#00ffff]"
//                 />
//                 <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
//                   Remember me
//                 </label>
//               </div>
//               <a href="#" className="text-sm text-[#00ffff] hover:text-[#00cccc] transition duration-300">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-[#0a0a1a] rounded-xl font-bold hover:from-[#ff5252] hover:to-[#ffc107] transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,107,107,0.4)] border-2 border-[#ff8c8c]"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-400">
//               Don't have a seller account?{' '}
//               <Link to="/seller-register" className="text-[#00ffff] hover:text-[#00cccc] transition duration-300">
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // SellerLogin export removed
