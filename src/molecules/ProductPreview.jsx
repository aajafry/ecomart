/* eslint-disable react/prop-types */
import ReactImageMagnify from "react-image-magnify";

function ProductPreview({ product, mainImage, changeMainImage }) {
  const { name, previewImages } = product || {};


  if(!mainImage) {
    return <div className="flex-center animate-pulse">Loading...</div>;
  }

  return (
    <div className="flex-1 bg-gray-100">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: name,
            isFluidWidth: true,
            src: mainImage,
          },
          largeImage: {
            src: mainImage,
            width: 1200,
            height: 1800,
          },
          className: "!h-[550px]",
          imageClassName: "object-contain !h-full",
          enlargedImageContainerClassName: "hidden md:block",
          enlargedImageClassName: "!h-[1800px]",
          lensStyle: { backgroundColor: "rgba(0,0,0,.5)" },
        }}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {previewImages?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-24 h-24 object-cover cursor-pointer border-2 rounded ${
              image === mainImage ? "border-amber-500" : "border-gray-300"
            }`}
            onClick={() => changeMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPreview