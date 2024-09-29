/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useUsers } from "../hooks/useUsers";
import ImageUploader from "../molecules/ImageUploader";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";


function EditProfileForm({ onClose, userUrl, userId, onUpdateUser }) {
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, retrieveUser, updateUser } = useUsers();

  const loadUserData = useCallback( async() => {
    const user = await retrieveUser(userUrl, userId)
    if (user) {
      setAvatar(user.avatar || null)
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [retrieveUser, setValue, userId, userUrl])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])


  const handleEditProfileWithForm = async (data) => {
    const updatedUser = await updateUser(userUrl, userId, {
      ...data, avatar,
    });

    if (updatedUser) {
      onUpdateUser(updatedUser);
      reset()
      setAvatar(null)
      onClose()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditProfileWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <ImageUploader
        label="Upload Avatar"
        required={false}
        initialImage={avatar}
        onImageChange={setAvatar}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          name="name"
          placeholder="enter your name"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="tel"
          name="phone"
          placeholder="enter your phone number"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="email"
          name="email"
          placeholder="enter your email address"
          required={false}
          register={register}
          errors={errors}
        />

        <PasswordInput
          name="password"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="country"
          placeholder="enter your country"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="state"
          placeholder="enter your state"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="city"
          placeholder="enter your city"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="zipCode"
          placeholder="enter your zip code"
          required={false}
          register={register}
          errors={errors}
        />
      </div>

      <Input
        type="text"
        name="address"
        placeholder="enter your address"
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Edit Profile"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default EditProfileForm;
