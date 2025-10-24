const InputField = ({
  type = "text",
  name,
  placeholder,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
    {...props}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`border border-gray-300 focus:outline-none p-3 rounded-lg text-gray-600 ${className}`}
      onChange={onChange}
    />
  );
};

export default InputField;
