import { useRef, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Illustration from "../../assets/signup.png";

/* -------------------- Validation -------------------- */
const basePassword = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[0-9]/, "Add a number");

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    phone: z
      .string()
      .min(7, "Phone number looks too short")
      .regex(/^[0-9+\-\s()]*$/, "Use digits and + - ( ) only")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Enter a valid email"),
    password: basePassword,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupView() {
  // measure header/footer/breadcrumb to keep your layout stable
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const crumbRef = useRef(null);
  const [vars, setVars] = useState({});
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const update = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      const f = footerRef.current?.offsetHeight ?? 0;
      const c = crumbRef.current?.offsetHeight ?? 0;
      setVars({ ["--header-h"]: `${h}px`, ["--footer-h"]: `${f}px`, ["--crumb-h"]: `${c}px` });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const [flash, setFlash] = useState(null); // success/error banner

  async function onSubmit(values) {
    setFlash(null);
    clearErrors("root");

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      phone: values.phone || undefined,
      email: values.email,
      password: values.password,
    };

    try {
      // TODO: replace with your real endpoint
      // const res = await fetch("/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) {
      //   const err = await res.json().catch(() => ({}));
      //   if (err?.field === "email") setError("email", { message: err.message || "Email already exists" });
      //   else if (err?.field === "username") setError("username", { message: err.message || "Username taken" });
      //   else setError("root", { message: err.message || "Registration failed" });
      //   return;
      // }

      // Simulated success
      await new Promise((r) => setTimeout(r, 700));
      setFlash({ type: "success", msg: "Account created! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 900);
    } catch (e) {
      setError("root", { message: "Network error. Please try again." });
      setFlash({ type: "error", msg: "Network error. Please try again." });
    }
  }

  const inputBase =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none " +
    "placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-indigo-500";
  const errorText = "mt-1 text-xs text-red-600";

  return (
    <div className="min-h-screen flex flex-col bg-white" style={vars}>
      {/* Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      <main className="flex-1">
        {/* Breadcrumb + separator */}
        <div ref={crumbRef} className="mx-auto w-full max-w-7xl px-6 pt-3 md:pt-4">
          <div className="text-[13px] text-slate-500">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Signup" }]} />
          </div>
          <div className="mt-2 border-b border-slate-200" />
        </div>

        {/* Signup (compact card) */}
        <section className="mx-auto w-full max-w-7xl px-6 flex items-center justify-center py-8 mb-10">
          <div className="card mx-auto w-full max-w-[700px] px-6 py-6 md:px-8 md:py-8">
            {/* Flash message */}
            {flash && (
              <div
                className={`mb-4 rounded-md px-3 py-2 text-sm ${
                  flash.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
                role="status"
              >
                {flash.msg}
              </div>
            )}
            {errors.root?.message && (
              <div
                className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {errors.root.message}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {/* Illustration */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img
                  src={Illustration}
                  alt="Illustration for secure signup"
                  className="w-full max-w-[250px] md:max-w-[480px] max-h-[480px] object-contain select-none"
                />
              </div>

              {/* Form */}
              <div className="order-1 md:order-2 flex flex-col justify-center">
                <h1 className="text-center text-lg md:text-xl font-semibold text-slate-800">
                  Hello There!
                </h1>
                <p className="mt-1 text-center text-xs text-slate-500 max-w-[300px] mx-auto leading-5">
                  Glad to see you joining us. Please fill up the following fields to set your
                  account up.
                </p>

                <form
                  className="mt-4 space-y-2 max-w-[350px] mx-auto"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  {/* First & Last */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="firstName">
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
                        <p className={errorText}>{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="lastName">
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
                        <p className={errorText}>{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="sr-only" htmlFor="username">
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
                      <p className={errorText}>{errors.username.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      {...register("phone")}
                      placeholder="Phone Number"
                      type="tel"
                      aria-invalid={!!errors.phone}
                      className={inputBase}
                    />
                    {errors.phone && (
                      <p className={errorText}>{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="sr-only" htmlFor="email">
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
                      <p className={errorText}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="sr-only" htmlFor="password">
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
                      <p className={errorText}>{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="sr-only" htmlFor="confirmPassword">
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
                      <p className={errorText}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      (!isValid && Object.keys(touchedFields).length > 0)
                    }
                    className="mt-1 w-full rounded-md bg-[#8AB872] py-2 text-center text-[13px] font-semibold text-white
                               transition hover:bg-green-600 active:translate-y-[1px]
                               disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Next"}
                  </button>
                </form>

                <p className="mt-2 text-center text-xs text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
