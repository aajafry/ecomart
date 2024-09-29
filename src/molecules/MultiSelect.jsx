/* eslint-disable react/prop-types */
import Select from "react-select";

function MultiSelect({ name, options, onChange, value }) {
  const allOptions = [{ value: "all", label: "Select All" }, ...options];

  const formattedValue = value.includes("all")
    ? allOptions
    : options.filter((option) => value.includes(option.value));

  const isAllSelected = formattedValue.length === options.length;

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    if (selectedValues.includes("all")) {
      onChange(
        name,
        isAllSelected ? [] : options.map((option) => option.value)
      );
    } else {
      onChange(name, selectedValues);
    }
  };

  return (
    <Select
      isMulti
      name={name}
      options={allOptions}
      onChange={handleChange}
      value={formattedValue}
      placeholder="Select Product..."
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}

export default MultiSelect;
