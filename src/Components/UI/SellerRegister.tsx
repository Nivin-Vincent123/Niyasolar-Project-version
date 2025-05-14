


// // SellerRegister component removed
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     businessName: '',
//     address: ''
//   });

//   const [message, setMessage] = useState('');
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
//     // Test form submission

//     setMessage('Registration successful! Redirecting to login page...');
//     setTimeout(() => {
//       navigate('/seller-login');
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-5xl font-bold text-[#00ffff] font-['Orbitron'] tracking-wider mb-2">
//             BookBee
//           </h2>
//           <p className="text-xl text-gray-400 font-['Poppins']">Seller Registration (Test)</p>
//         </div>

//         <div className="bg-[#1a1a2a] rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.15)] p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-[#00ffff] mb-2 font-['Poppins']">Full Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-[#00ffff] mb-2 font-['Poppins']">Email Address</label>
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
//               <label htmlFor="businessName" className="block text-[#00ffff] mb-2 font-['Poppins']">Business Name</label>
//               <input
//                 type="text"
//                 id="businessName"
//                 name="businessName"
//                 value={formData.businessName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-[#00ffff] mb-2 font-['Poppins']">Business Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-[#00ffff] mb-2 font-['Poppins']">Password</label>
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

//             <div>
//               <label htmlFor="confirmPassword" className="block text-[#00ffff] mb-2 font-['Poppins']">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-[#0a0a1a] text-gray-300 border-2 border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent transition duration-300"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-[#0a0a1a] rounded-xl font-bold hover:from-[#ff5252] hover:to-[#ffc107] transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,107,107,0.4)] border-2 border-[#ff8c8c]"
//             >
//               Register (Test)
//             </button>
//           </form>

//           {message && (
//             <div className="mt-6 text-center text-[#00ff00]">
//               {message}
//             </div>
//           )}

//           <div className="mt-6 text-center">
//             <p className="text-gray-400">
//               Already have an account?{' '}
//               <Link to="/seller-login" className="text-[#00ffff] hover:text-[#00cccc] transition duration-300">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // SellerRegister export removed
