/* eslint-disable react/prop-types */

function TagsCard({ tags }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-4">
      {tags?.map((tag) => (
        <p
          key={tag}
          className="py-1 px-2 text-sm font-medium bg-amber-400 rounded-xl"
        >
          {tag}
        </p>
      ))}
    </div>
  );
}

export default TagsCard