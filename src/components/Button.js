import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  type = "button", 
  onClick, 
  children, 
  className = "", 
  disabled = false 
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`w-full py-3.5 rounded-lg font-medium shadow-md transition-all ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'hover:shadow-lg'
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;