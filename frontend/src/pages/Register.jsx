import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
} from "lucide-react";
import registerSchema from "../schemas/registerSchema";
import authService from "../services/Auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({});
  const [isLoading, setisLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleRegisterChange(e) {
    let { name, value } = e.target;

    setregister((prev) => ({ ...prev, [name]: value }));

    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      if (error.errors) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(fieldErrors);
      }
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setisLoading(true);

    try {
      await authService.createAccount(register);
      setisLoading(false);
      toast.success("Registeration Successfull");
      dispatch(setLoggedin(true));
      navigate("/onboarding");
    } catch (error) {
      setisLoading(false);
      toast.error(error?.message);
    }
  }

  async function handleGoogleOauth() {
    try {
      await authService.googleLogin();

      toast.success("Successfully Signed Up with Google");
      dispatch(setLoggedin(true));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#141B2D] p-10 rounded-2xl border border-dark-200 shadow-2xl"
        >
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Create Your Account
          </h2>

          <button
            onClick={handleGoogleOauth}
            className="w-full flex items-center justify-center space-x-2 bg-[#172033] text-white hover:bg-[#28334c] font-medium rounded-md px-4 py-2 mb-6  transition-colors duration-200"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full "></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-md bg-dark-300 text-gray-400">Or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  className="block bg-[#172033] w-full pl-10 pr-3 py-2 rounded-md   outline-none text-white placeholder-gray-400 "
                  placeholder="John Doe"
                  name="name"
                  value={register.name}
                  onChange={handleRegisterChange}
                />
              </div>
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="block bg-[#172033] outline-none w-full pl-10 pr-3 py-2 rounded-md bg-dark-200 text-white placeholder-gray-400 "
                  placeholder="johndoe123@gmail.com"
                  name="email"
                  value={register.email}
                  onChange={handleRegisterChange}
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="block bg-[#172033] outline-none w-full pl-10 pr-10 py-2 rounded-md bg-dark-200  text-white placeholder-gray-400 "
                  placeholder="••••••••"
                  name="password"
                  value={register.password}
                  onChange={handleRegisterChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#0EA5E9] flex justify-center gap-4 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md w-full transition duration-200"
            >
              Create Account
              {isLoading && <span class="loader"></span>}
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-400 font-medium"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-xs text-center text-gray-400">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary-500 hover:text-primary-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-500 hover:text-primary-400">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
