import { useState } from 'react';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from "../../services/authService"; // Import the login function
import Input from '../Input';
import Button from '../Button';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    error: ''
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required!";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
     setErrors((prev) => ({
       ...prev,
       general:"",
     }));
    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUser(credentials); // Call the login function
      console.log("Login successful:", response);

      // Save the token and role to localStorage
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("role", response.role); // Store the role (admin/user)

      if (response.role == "STUDENT") {
        navigate("/student/learning");
      } else {
        navigate("/admin/dashboard");
      }
        // Redirect to a common route (e.g., /dashboard)
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message || "Login failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Access your personalized dashboard</p>
          </div>

          {errors.general && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100"
            >
              <FiAlertCircle className="flex-shrink-0" />
              <span className="text-sm">{errors.general}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              icon={<FiMail />}
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              name="email"
              error={errors.email}
              // required
              onFocus={() => handleInputFocus('email')}
            />

            <Input
              label="Password"
              type="password"
              icon={<FiLock />}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              name="password"
              error={errors.password}
              isPassword
              showPassword={formData.showPassword}
              onTogglePassword={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
              // required
              onFocus={() => handleInputFocus('password')}
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Create one
            </Link>
          </div>

          {/* <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm4.293 15.707a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 011.414-1.414L10 8.586l2.879-2.879a1 1 0 011.414 1.414L11.414 10l2.879 2.879z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div> */}
        </motion.div>
      </div>
    </>
  );
}
