import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const validateEmail = (email) => validator.isEmail(email);

const SignupView = () => {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!validateEmail(data.email)) {
      setError("email", { type: "auto", message: "Invalid email format" });
      return;
    }
    if ((data.password || "").length < 6) {
      setError("password", { type: "auto", message: "Password must be at least 6 characters long" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", data);
      toast.success("Account created! Please log in.");
      reset();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">Create an account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input {...register("name")} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input {...register("email")} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input type="password" {...register("password")} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600">Role (optional)</label>
            <select {...register("userType")} className="w-full border rounded-md px-3 py-2">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-md">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupView;
