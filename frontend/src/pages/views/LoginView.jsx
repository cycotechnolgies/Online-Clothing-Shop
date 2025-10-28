import React, { useState, useEffect } from "react"; // Import useEffect
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/Login_Image.jpg"; 
import logo from "../../assets/OLLY LOGO.png"; 
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import axios from "axios";

const LoginView = () => {
  const navigate = useNavigate();
  // Get user and loading from context
  const { login, user, loading } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  
  // This state is for the form submission, separate from context loading
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // --- THIS IS THE NEW FIX ---
  // This hook handles the redirect loop
  useEffect(() => {
    // Wait until the AuthContext is done loading the user from localStorage
    if (loading) {
      return; 
    }

    // If we have a user, redirect them
    if (user) {
      if (user.userType && user.userType.toLowerCase() === 'admin') {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate]); // Re-run when user or loading changes
  // --- END OF NEW FIX ---


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      // 1. Call login and get the user data back
      const loggedInUser = await login(email, password); 

      // 2. Check the user's role (case-insensitive)
      if (loggedInUser.userType && (loggedInUser.userType.toLowerCase() === 'admin')) {
        // 3. If admin, go to dashboard
        navigate("/dashboard");
      } else {
        // 4. If not admin, go to home page
        navigate("/");
      }

    } catch (err) {
      setError(err.response ? err.response.data.message : "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google/Facebook handlers
  const handleSocialLoginError = () => {
     setError("Social login is not connected. Please use email and password.");
  }

  // If the context is loading, or we are logged in and redirecting, show nothing
  if (loading || user) {
    return <div>Loading...</div>; // Or a spinner
  }

  // Only show the login form if we are not loading and have no user
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex">
        {/* Left side: Hero image for larger screens */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={image}
            alt="Fashion Collection"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side: Login form */}
        <div className="w-full p-8 lg:w-1/2 lg:p-12">
          <div className="mx-auto max-w-sm">
            <div className="flex items-center justify-center gap-2">
              <img src={logo} alt="logo" className="h-18 w-auto" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address or Username
                </label>
                <input
                  id="email"
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-lg bg-black px-3 py-3 text-base font-bold text-white shadow-sm hover:bg-gray-800  disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Social login divider */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="mt-6 flex flex-col gap-4 justify-center items-center">
              <GoogleLogin
                onSuccess={handleSocialLoginError}
                onError={handleSocialLoginError}
                useOneTap
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || isSubmitting}
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-3 text-base font-semibold text-gray-800 shadow-md hover:from-indigo-100 hover:to-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <img src={google} alt="Google" className="mr-3 h-6 w-6" />
                    Sign in with Google
                  </button>
                )}
              />
            </div>

            {/* Signup link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              New to OLLY Clothing?{" "}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

