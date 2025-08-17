// src/App.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

// pages
import LoginView from "./pages/views/LoginView";
import HomeView from "./pages/views/HomeView";
import SignupView from "./pages/views/SignupView";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// A layout component without the Header
const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="signup" element={<SignupView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
