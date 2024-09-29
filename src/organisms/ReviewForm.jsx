/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import Button from "../atoms/Button";
import { useReview } from "../hooks/useReview";
import Textarea from "../molecules/Textarea";


function ReviewForm({ orderId, productId, onClose }) {
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isDisable, createRivew } = useReview();

  const handleAddReview = async (data) => {
    const newReview = await createRivew({
      ...data,
      rating,
      productId,
      orderId,
    });

    if (newReview) {
      reset()  
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddReview)}
      className="flex flex-col gap-4 my-4"
    >
      <StarRatings
        rating={rating}
        starRatedColor="#f59e0b"
        starHoverColor="#f59e0b"
        changeRating={setRating}
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="1px"
      />

      <Textarea
        name="comment"
        placeholder="enter comment of this product"
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "uploading..." : "Add Review"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
      
    </form>
  );
}

export default ReviewForm