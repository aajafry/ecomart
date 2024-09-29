/* eslint-disable react/prop-types */

function Input({
  type,
  name,
  placeholder,
  required,
  register,
  errors,
  className,
}) {
  const baseStyle =
    "w-full py-2 px-3 rounded-lg bg-transparent border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500";

    
  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, { required: required })}
        className={`${baseStyle} ${className}`}
      />
      {errors[name] && <p className="text-red-600">{errors[name].message}</p>}
    </div>
  );
}

export default Input