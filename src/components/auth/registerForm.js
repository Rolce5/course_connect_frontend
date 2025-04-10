import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../Button";
import Input from "../Input";
import { registerUser } from "../../services/authService"; // Import the register function

// Validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Password strength calculation
    if (name === "password") {
      let strength = 0;
      if (value.length > 0) strength += 1;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase, one number, and one special character";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      };

      // Register and log in the user
      const response = await registerUser(userData); // Register and automatically log in
      console.log("Registration and Login successful:", response);

      // Store the token in localStorage or another place
      localStorage.setItem("token", response.access_token);

      setSuccessMessage(
        "Registration successful! Redirecting to your dashboard..."
      );
      navigate("/dashboard"); // Redi
      <toast className="success"></toast>('Course deleted succusfully.');

    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Registration failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Our Community
          </h1>
          <p className="text-gray-500">Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {successMessage && (
            <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="First Name"
                type="text"
                icon={<FiUser />}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                name="firstName"
                error={errors.firstName}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Input
                label="Last Name"
                type="text"
                icon={<FiUser />}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                name="lastName"
                error={errors.lastName}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              icon={<FiMail />}
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              name="email"
              error={errors.email}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              icon={<FiLock />}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              name="password"
              isPassword
              showPassword={formData.showPassword}
              onTogglePassword={() => togglePasswordVisibility("showPassword")}
              error={errors.password}
              required
            />
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= passwordStrength
                      ? passwordStrength <= 2
                        ? "bg-red-400"
                        : passwordStrength <= 4
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              icon={<FiLock />}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              name="confirmPassword"
              isPassword
              showPassword={formData.showConfirmPassword}
              onTogglePassword={() =>
                togglePasswordVisibility("showConfirmPassword")
              }
              error={errors.confirmPassword}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["STUDENT", "INSTRUCTOR"].map((role) => (
                <label
                  key={role}
                  className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.role === role
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium capitalize">
                    {role.toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            }`}
          >
            {isSubmitting ? (
              "Creating Account..."
            ) : (
              <>
                Create Account <FiArrowRight className="ml-2 inline" />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
