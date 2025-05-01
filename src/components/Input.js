import React from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ 
  label, 
  type = "text",
  icon, 
  value, 
  onChange, 
  placeholder, 
  isPassword, 
  showPassword, 
  onTogglePassword,
  name,
  className = "",
  required = false,
  error = ''
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center ${
            error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-indigo-500'
          } transition-colors`}>
            {icon}
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
          } rounded-xl focus:ring-1 focus:ring-indigo-500 transition-all ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              error ? 'text-red-500' : 'text-gray-400 hover:text-indigo-500'
            } transition-colors`}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;