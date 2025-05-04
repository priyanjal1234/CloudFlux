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
import loginSchema from "../schemas/loginSchema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({});
  const [isLoading, setisLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleLoginChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));

    try {
      loginSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors({});
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

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setisLoading(true);

    try {
      await authService.loginAccount(login);
      setisLoading(false);
      toast.success("Login Success");
      dispatch(setLoggedin(true));
      navigate("/onboarding");
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }
  }

  async function handleGoogleOauth() {
    try {
      await authService.googleLogin();

      toast.success("Successfully Logged in with Google");
      dispatch(setLoggedin(true));
      navigate("/onboarding");
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
            Login Your Account
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
            <span>Login with Google</span>
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
          <form onSubmit={handleLoginSubmit} className="space-y-6">
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
                  value={login.email}
                  onChange={handleLoginChange}
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
                  value={login.password}
                  onChange={handleLoginChange}
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
              Login
              {isLoading && <span class="loader"></span>}
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-500 hover:text-primary-400 font-medium"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
