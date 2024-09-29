/* eslint-disable react/prop-types */
function TagsInput({ required, initialTags, onTagsChange }) {
  const handleAddTag = (event) => {
    const newTag = event.target.value.trim();
    if (newTag && !initialTags.includes(newTag)) {
      onTagsChange([...initialTags, newTag]);
    }
    event.target.value = "";
  };

  const handleRemoveTag = (RemoveTag) => {
    onTagsChange(initialTags.filter((tag) => tag !== RemoveTag));
  };

  return (
    <div className="flex flex-wrap gap-2 w-full py-1 px-2 rounded-lg border-[1px] border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500">
      <ul className="flex flex-wrap gap-2">
        {initialTags.map((tag, index) => (
          <li
            key={index}
            className="flex-center bg-gray-200 dark:bg-slate-800 rounded-full w-auto py-1 px-3"
          >
            <p className="mr-1 text-sm font-semibold">{tag}</p>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-lg font-bold text-gray-700 dark:text-gray-300"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="tag"
        id="tag"
        placeholder="add a new tag"
        autoComplete="off"
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleAddTag(event);
          }
        }}
        required={required}
        className="flex-1 p-1 bg-transparent border-none outline-none"
      />
    </div>
  );
}

export default TagsInput