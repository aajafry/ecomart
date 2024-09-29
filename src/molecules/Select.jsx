/* eslint-disable react/prop-types */

function Select({ name, required, options, register, errors }) {
  return (
    <div>
      <select
        name={name}
        id={name}
        {...register(name, { required: required })}
        className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-700 border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500"
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-600">{errors[name].message}</p>}
    </div>
  );
}

export default Select;
