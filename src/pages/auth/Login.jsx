import React, { useState } from "react";
import { HiSparkles, HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

// If you're using react-hook-form, make sure these come from props or import them:
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks and contexts/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, googleSignIn } = useAuth();
  const navigate = useNavigate();

  console.log("SIGN IN USER FROM CONTEXT:", signInUser);

  // form handlers
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await signInUser(data.email, data.password);
    console.log(data);
    navigate("/");
  };

  const handleGoogleSignup = async () => {
    const res = await googleSignIn();
    console.log("google login successful:", res.user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex items-center justify-center px-6 py-12 bg-bg-main"
      >
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8 flex flex-col items-center gap-5">
            <Link to="/">
              <Logo></Logo>
            </Link>

            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Login to your account
            </h2>
            <p className="text-sm text-text-secondary">Welcome back</p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-bg-main border-2 border-neutral hover:border-primary rounded-lg transition-all text-text-primary font-medium hover:shadow-md mb-6"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-main text-text-muted">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-2.5 bg-bg-alt border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary placeholder-text-muted"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-2.5 bg-bg-alt border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-primary pr-10 placeholder-text-muted"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <HiEyeOff className="w-5 h-5" />
                ) : (
                  <HiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md mt-2"
          >
            Login
          </button>

          {/* Registration Link */}
          <p className="text-center text-sm text-text-secondary mt-4">
            Don't have an account?{" "}
            <a
              href="/registration"
              className="text-primary hover:text-accent font-semibold"
            >
              Register here
            </a>
          </p>
        </div>
      </form>

      {/* Right Side Image */}
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
};

export default Login;
