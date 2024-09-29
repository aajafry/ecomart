/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordInput({name, required, register, errors}) {
  const [showPassword, setShowPassword] = useState(false);
    
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        placeholder="enter password"
        autoComplete="off"
        {...register(name, { required: required })}
        className="w-full py-2 px-3 rounded-lg bg-transparent border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500"
      />
      {errors[name] && <p className="text-red-600">{errors[name].message}</p>}
      {showPassword ? (
        <AiOutlineEye
          size="18"
          title="show password"
          aria-label="show password"
          onClick={() => setShowPassword(false)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        />
      ) : (
        <AiOutlineEyeInvisible
          size="18"
          title="hide password"
          aria-label="hide password"
          onClick={() => setShowPassword(true)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
}

export default PasswordInput