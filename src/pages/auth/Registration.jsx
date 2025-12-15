import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { HiEye, HiEyeOff, HiSparkles } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks and contexts/auth/useAuth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../hooks and contexts/axios/AxiosInstance";
import Logo from "../../components/Logo";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, handleProfileUpdate, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;

  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm();

  const password = useWatch({ control, name: "password" });

  // Password validation rules
  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasUpperCase: (value) =>
        /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
      hasLowerCase: (value) =>
        /[a-z]/.test(value) || "Must contain at least one lowercase letter",
      hasNumber: (value) =>
        /[0-9]/.test(value) || "Must contain at least one number",
      hasSpecialChar: (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Must contain at least one special character",
    },
  };

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("file", data.photo[0]);
    formData.append("upload_preset", preset);

    try {
      const createRes = await createUser(data.email, data.password);
      console.log("user account created: ", createRes);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const url = await uploadRes.data.secure_url;
      console.log(url);

      await handleProfileUpdate(data.name, url);
      console.log("profile updated with photo url");

      const userData = {
        userName: data.name,
        userEmail: data.email,
        photoUrl: url,
        role: "user",
        status: "active",
      };

      const postRes = await axiosInstance.post("/users", userData);
      console.log(postRes.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    const res = await googleSignIn();
    console.log("google login successful", res);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex  bg-secondary">
      <div className="mx-5 lg:mx-10 my-5 absolute">
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>
      {/* Left Side - Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 mt-10 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Create your account
            </h2>
            <p className="text-sm text-gray-600">
              Join us and transform your spaces
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-neutral hover:border-primary rounded-lg transition-all text-gray-700 font-medium hover:shadow-md mb-6"
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-secondary text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full px-4 py-2.5 bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-700"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-2.5 bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-700"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", passwordValidation)}
                  className="w-full px-4 py-2.5 bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-700 pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

              {/* Password Strength Indicators */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        password.length >= 8
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /[A-Z]/.test(password)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        /[a-z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /[a-z]/.test(password)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        /[0-9]/.test(password) ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /[0-9]/.test(password)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        /[!@#$%^&*(),.?":{}|<>]/.test(password)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={
                        /[!@#$%^&*(),.?":{}|<>]/.test(password)
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One special character
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Photo URL */}
            <div className="w-full">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Photo (Optional)
              </label>
              <div className="relative">
                <input
                  id="photoURL"
                  {...register("photo")}
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border file:border-neutral file:text-sm
                 file:bg-white file:text-gray-700
                 hover:file:bg-primary hover:file:text-white
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                 transition-all duration-300"
                />
              </div>
              {errors.photoURL && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="w-4 h-4 mt-0.5 text-primary border-neutral rounded focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-primary hover:text-accent font-medium"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:text-accent font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-600 text-xs mt-1">
                {errors.terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full ${
                isSubmitting ? "bg-emerald-300" : "bg-primary"
              } hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md mt-2`}
            >
              {isSubmitting ? "Creating your account..." : "Register"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:text-accent font-semibold"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </form>

      {/* Right Side - Image (Hidden on mobile) */}
      <div className="hidden lg:block lg:flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
          alt="Elegant decoration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/60"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h2 className="text-4xl font-bold mb-4">Transform Your Spaces</h2>
            <p className="text-lg text-white/90">
              Join thousands of happy clients who have made their dream spaces a
              reality with StyleDecor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
