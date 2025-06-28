function FloatingInput({
  id,
  type = "text",
  label,
  value,
  onChange,
  error,
  required = false,
}) {
  return (
    <div className="relative mb-5">
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        className={`peer w-full px-4 pt-5 pb-2 text-sm rounded-lg bg-[#dce4ef] text-[#333]
          shadow-[inset_6px_6px_12px_#c8d0e7,_inset_-6px_-6px_12px_#ffffff]
          focus:outline-none focus:ring-2 focus:ring-gray-300
          ${error ? "border border-red-500" : ""}
        `}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-sm text-gray-600 transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-600
          ${value ? "top-1 text-xs text-gray-600" : ""}
        `}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default FloatingInput;
