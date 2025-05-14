import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Components/CartPage";
import Header from "./Components/UI/Header";
import DisclaimerBanner from "./Components/UI/DisclaimerBanner";
import AboutProject from "./Components/UI/AboutProject";
import Footer from "./Components/UI/Footer";
import Home from "./Components/UI/Home";
import Login from "./Components/UI/Login";
import Signup from "./Components/UI/Signup";
import Support from "./Components/UI/Support";
import AddProduct from "./Components/AdminDashboardTabs/AddProduct";
import DeleteProductPage from "./Components/AdminDashboardTabs/DeleteProductPage";
import CheckoutPage from "./Components/Checkout/CheckoutPage";
import OrderConfirmation from "./Components/OrderConfirmation";
import ManageStock from "./Components/AdminDashboardTabs/ManageStock";
import ProductList from "./Components/ProductList";
import InstallerDashboard from "./Components/InstallerDashboard";
import InstallerContact from "./Components/InstallerContact";
import OrdersTab from "./Components/InstallerDashboardTabs/OrdersTab";
import AdminDashboard from "./Components/AdminDashboardTabs/AdminDashboard";
import ManageOrdersTab from "./Components/AdminDashboardTabs/ManageOrdersTab";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails";

import { CartProvider } from "./Components/CartContext";
import CartToast from "./Components/CartToast";

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <DisclaimerBanner />
          <CartToast />
          <main style={{ flexGrow: 1 }} className="pt-20">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/installer/dashboard" element={
              <ProtectedRoute allowedRoles={["Installer"]}>
                <InstallerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/installer/contact" element={
              <ProtectedRoute allowedRoles={["Installer"]}>
                <InstallerContact />
              </ProtectedRoute>
            } />
            <Route path="/installer/orders" element={
              <ProtectedRoute allowedRoles={["Installer"]}>
                <OrdersTab />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/admin/delete-product" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DeleteProductPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-stocks" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ManageStock />
              </ProtectedRoute>
            } />
            
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<AboutProject />} />
            <Route path="/admin/orders" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ManageOrdersTab />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </CartProvider>
  );
}

export default App;
