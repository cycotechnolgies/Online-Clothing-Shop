<<<<<<< Updated upstream
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center mt-10'>
        Online-Clothing-Shop
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300'
      >click me</button>
=======
import { Route, Routes } from "react-router-dom";
import './App.css'

// pages
import LoginView from "./pages/views/LoginView";
import SignupView from "./pages/views/SignupView";
import HomeView from "./pages/views/HomeView";

function App() {
  return (
    <>
      <Routes>
        {/* homepage Route */}
        <Route path="/" element={<HomeView />} />

        {/* Login Route */}
        <Route path="/login" element={<LoginView />} />

        {/* Signup Route */}
        <Route path="/signup" element={<SignupView />} />
      </Routes>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
