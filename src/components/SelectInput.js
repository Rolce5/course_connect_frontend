import React from "react";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [], // Array of options: [{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]
  placeholder = "Select an option", // Placeholder text
  error,
  disabled,
  styles,
  style,
}) => {
  return (
    <div className={`mb-6 ${styles}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-gris-300 text-base font-bold mb-2 font-medium"
        >
          {label}
        </label>
      )}

      {/* Select Dropdown */}
      <div className="relative">
        <select
          name={name}
          value={value} // The value is already a boolean (true/false)
          onChange={(e) => {
            // Convert the string value back to a boolean
            const selectedValue = e.target.value === "true";
            onChange(selectedValue);
          }}
          disabled={disabled}
          className={`w-full px-7 py-3 border rounded-[10px] 
                shadow-[0px_5.16px_13.75px_1.72px_#EDEDED] 
                focus:outline-none
                placeholder-primary-400
                placeholder:font-medium
                placeholder:text-[14px] placeholder-opacity-80
                placeholder:leading-[9.8px]
                ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"} 
                ${error ? "border-red-500" : ""} ${style}`}
        >
          {/* Placeholder Option */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Dynamic Options */}
          {options.map((option) => (
            <option key={option.value.toString()} value={option.value.toString()}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Error Message */}
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    </div>
  );
};

export default SelectInput;