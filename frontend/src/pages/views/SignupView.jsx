// SignupView.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchemas";
import SignupImage from "../../assets/Signup_Img.jpg";
import google from "../../assets/google.svg";
import logo from "../../assets/OLLY LOGO.png"; 
import toast, { Toaster } from "react-hot-toast";

// [ADDED] Base URL for API (falls back to localhost if env not set)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SignupView() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    clearErrors,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  // Handle form submission
  async function onSubmit(values) {
    clearErrors("root");
    setError(null);
    setLoading(true);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      // [REMOVED] Simulated API call:
      // await new Promise((resolve) => setTimeout(resolve, 700));

      // [ADDED] Real API call to backend
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.message || "Registration failed";
        setFormError("root", { message: msg });
        setError(msg);
        toast.error(msg);
        return;
      }

      toast.success("Account created! Redirecting to login...");
      // [CHANGED] immediate navigate; keep structure/flow the same
      setTimeout(() => navigate("/login"), 800);
    } catch (e) {
      setFormError("root", { message: "Network error. Please try again." });
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Google login success handler
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Simulate Google login (replace with actual auth logic)
      toast.success("Google signup successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError("Google signup failed. Please try again.");
      toast.error("Google signup failed.");
    }
  };

  const inputBase =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 " +
    "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex">
        {/* Left side: Image for larger screens */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={SignupImage}
            alt="Fashion Collection"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side: Signup form */}
        <div className="w-full p-8 lg:w-1/2 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-center gap-2">
              <img src={logo} alt="logo" className="h-18 w-auto" />
            </div>
            <h1 className="text-center text-3xl font-bold text-gray-900">Join Us Now !</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create an account to explore exclusive collections
            </p>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="First Name"
                    aria-invalid={!!errors.firstName}
                    className={inputBase}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Last Name"
                    aria-invalid={!!errors.lastName}
                    className={inputBase}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  {...register("username")}
                  placeholder="Username"
                  aria-invalid={!!errors.username}
                  className={inputBase}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  placeholder="Email"
                  type="email"
                  aria-invalid={!!errors.email}
                  className={inputBase}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password")}
                  placeholder="Password"
                  type="password"
                  aria-invalid={!!errors.password}
                  className={inputBase}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  type="password"
                  aria-invalid={!!errors.confirmPassword}
                  className={inputBase}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isSubmitting || (!isValid && Object.keys(touchedFields).length > 0) || loading
                }
                className="flex w-full justify-center rounded-lg bg-black px-4 py-2.5 text-base font-bold text-white shadow-sm hover:bg-gray-800  disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting || loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Social login divider */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="mt-6 flex flex-col justify-center items-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google signup failed.")}
                useOneTap
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || loading}
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 text-base font-semibold text-gray-800 shadow-md hover:from-indigo-100 hover:to-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <img src={google} alt="Google" className="mr-3 h-6 w-6" />
                    Sign up with Google
                  </button>
                )}
              />
            </div>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
