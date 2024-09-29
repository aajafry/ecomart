export const getStickerClass = (sticker) => {
  switch (sticker) {
    case "discount":
      return "bg-rose-500";
    case "popular":
      return "bg-violet-500";
    case "new":
      return "bg-emerald-500";
    default:
      return "bg-sky-500";
  }
};