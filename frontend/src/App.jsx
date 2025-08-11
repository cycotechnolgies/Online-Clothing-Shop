import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css'

// pages
import LoginView from "./pages/views/LoginView";
import HomeView from "./pages/views/HomeView";
import SignupView from "./pages/views/SignupView";

const GOOGLE_CLIENT_ID = "516625281326-69julajhd1f8oq4htv4cfvssu6v5u8i2.apps.googleusercontent.com"; // Replace this with your Google OAuth client ID

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Routes>
        {/* homepage Route */}
        <Route
          path="/"
          element={<HomeView />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={<LoginView />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={<SignupView />}
        />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;
