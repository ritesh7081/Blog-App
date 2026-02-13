import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    error = "",
    disabled = false,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border border-gray-300 dark:border-gray-700
          shadow-sm
          transition-all duration-300
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;