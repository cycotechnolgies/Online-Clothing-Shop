import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import loginImg from "../../assets/login.gif";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const validateEmail = (email) => validator.isEmail(email);
const validatePassword = (password) => validator.isLength(password, { min: 6 });

const LoginView = ({ setUser, navigateBasedOnRole }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!validateEmail(data.email)) {
      setError("email", { type: "auto", message: "Invalid email format" });
      return;
    }
    if (!validatePassword(data.password)) {
      setError("password", { type: "auto", message: "Password must be at least 6 characters long" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", data);
      const { token, userType, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", userType);

      setUser?.({ isAuthenticated: true, role: userType, user });
      toast.success("Login successful!");
      navigateBasedOnRole ? navigateBasedOnRole(userType) : navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img src={loginImg} alt="Login" className="object-cover w-full h-full" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-3xl text-center font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            Login
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link to="/signup" className="hover:underline">Sign up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
