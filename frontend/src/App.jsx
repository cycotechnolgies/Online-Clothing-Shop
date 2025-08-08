import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'

//pages
import LoginView from "./pages/views/LoginView";
import HomeView from "./pages/views/HomeView";


function App() {

  return (
    <>
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
      </Routes>
    </>
  )
}

export default App
