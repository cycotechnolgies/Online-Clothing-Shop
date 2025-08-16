import { useRef, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchemas";
import SignupImage from "../../assets/signup.png";
import toast, { Toaster } from "react-hot-toast";

export default function SignupView() {
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
      setVars({
        ["--header-h"]: `${h}px`,
        ["--footer-h"]: `${f}px`,
        ["--crumb-h"]: `${c}px`,
      });
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

  async function onSubmit(values) {
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
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (e) {
      setError("root", { message: "Network error. Please try again." });
      toast.error("Network error. Please try again.");
    }
  }

  const inputBase =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none " +
    "placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-indigo-500";
  const errorText = "mt-1 text-xs text-red-600";

  return (
    <div className="min-h-screen flex flex-col bg-white" style={vars}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      <main className="flex-1">
        {/* Breadcrumb */}
        <div ref={crumbRef} className="mx-auto w-full max-w-7xl px-6 pt-3 md:pt-4">
          <div className="text-[13px] text-slate-500">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Signup" }]} />
          </div>
          <div className="mt-2 border-b border-slate-200" />
        </div>

        {/* Signup */}
        <section className="mx-auto w-full max-w-7xl px-6 flex items-center justify-center py-8 mb-10">
          <div className="card mx-auto w-full max-w-[700px] px-6 py-6 md:px-8 md:py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {/* Image */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img
                  src={SignupImage}
                  alt="Signup"
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
                      <input
                        id="firstName"
                        {...register("firstName")}
                        placeholder="First Name"
                        aria-invalid={!!errors.firstName}
                        className={inputBase}
                      />
                      {errors.firstName && <p className={errorText}>{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <input
                        id="lastName"
                        {...register("lastName")}
                        placeholder="Last Name"
                        aria-invalid={!!errors.lastName}
                        className={inputBase}
                      />
                      {errors.lastName && <p className={errorText}>{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <input
                      id="username"
                      {...register("username")}
                      placeholder="Username"
                      aria-invalid={!!errors.username}
                      className={inputBase}
                    />
                    {errors.username && <p className={errorText}>{errors.username.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      id="phone"
                      {...register("phone")}
                      placeholder="Phone Number"
                      type="tel"
                      aria-invalid={!!errors.phone}
                      className={inputBase}
                    />
                    {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      id="email"
                      {...register("email")}
                      placeholder="Email"
                      type="email"
                      aria-invalid={!!errors.email}
                      className={inputBase}
                    />
                    {errors.email && <p className={errorText}>{errors.email.message}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <input
                      id="password"
                      {...register("password")}
                      placeholder="Password"
                      type="password"
                      aria-invalid={!!errors.password}
                      className={inputBase}
                    />
                    {errors.password && <p className={errorText}>{errors.password.message}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      placeholder="Confirm Password"
                      type="password"
                      aria-invalid={!!errors.confirmPassword}
                      className={inputBase}
                    />
                    {errors.confirmPassword && (
                      <p className={errorText}>{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || (!isValid && Object.keys(touchedFields).length > 0)
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
                  <Link to="/login" className="font-medium text-indigo-600 hover:underline">
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