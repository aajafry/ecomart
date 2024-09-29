/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import Button from "../atoms/Button";
import Input from "../molecules/Input";


function SearchForm({ position }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSearch = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex flex-1">
      <Input
        type="search"
        name="search"
        placeholder="Search Product..."
        required={false}
        register={register}
        errors={errors}
        className={`${position === "drawer" ? "!rounded-l-md !rounded-none" : "!rounded-none"}`}
      />

      <Button
        type="submit"
        size="medium"
        label={<IoIosSearch size="24" />}
        className="cursor-pointer rounded-none !rounded-r-md bg-gray-200"
      />
    </form>
  );
}

export default SearchForm;
