/* eslint-disable react/prop-types */
import { useState } from 'react';

function Checkbox({label, name, required, register, errors}) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={name}
        id={name}
        value={isActive}
        onClick={() => setIsActive((prev) => !prev)}
        {...register(name, {
          required: required,
        })}
      />{" "}
      <label htmlFor={name}>{label}</label>
      {errors[name] && <p className="text-red-600">{errors[name].message}</p>}
    </div>
  );
}

export default Checkbox