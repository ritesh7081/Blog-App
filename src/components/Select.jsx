import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  {
    options = [],
    label,
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

      <div className="relative">
        <select
          id={id}
          ref={ref}
          disabled={disabled}
          {...props}
          className={`
            appearance-none w-full px-4 py-2.5 rounded-xl text-sm
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border border-gray-300 dark:border-gray-700
            shadow-sm
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${className}
          `}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;