import { Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import LoginView from "./pages/views/LoginView";
import HomeView from "./pages/views/HomeView";
import SignupView from "./pages/views/SignupView";
import CheckoutView from "./pages/views/CheckoutView";
import SingleProduct from "./pages/views/SingleProduct";
import CategoryView from "./pages/views/CategoryView";
import Cartview from "./pages/views/CartView";
import ProfileView from "./pages/views/ProfileView";
import DashboardView from "./pages/views/admin/Dashboard";
import RootLayout from "./layouts/RootLayout";
import PaymentView from "./pages/views/admin/PaymentView";
import OrderView from "./pages/views/admin/Orderview";
import ProductView from "./pages/views/admin/ProductView";
import UsersView from "./pages/views/admin/UsersView";
import UserEditPage from "./pages/views/admin/UserEditPage"; // <-- Kept this one
import CatagoryView from "./pages/views/admin/CatagoryView";

// [NEW] Import the protection route
import AdminRoute from "./utils/AdminRoute";
// [DELETED] The duplicate import from here is gone.


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AppLayout = () => <Outlet />;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="signup" element={<SignupView />} />
            <Route path="checkout" element={<CheckoutView />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="category/:categoryName" element={<CategoryView />} />
            <Route path="cart" element={<Cartview />} />
            <Route path="profile" element={<ProfileView />} />
          </Route>

          {/* [MODIFIED] Protected / Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <AdminRoute>
                <RootLayout />
              </AdminRoute>
            }
          >
            <Route index element={<DashboardView />} />
            <Route path="payments" element={<PaymentView />} />
            <Route path="orders" element={<OrderView />} />
            <Route path="products" element={<ProductView />} />
            <Route path="users" element={<UsersView />} />
            <Route path="categories" element={<CatagoryView />} />
            {/* [NEW] Add the edit user route */}
            <Route path="user/:id/edit" element={<UserEditPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;