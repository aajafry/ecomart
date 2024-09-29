import { Link } from "react-router-dom";

export const renderLinks = (links) => {
  return links.map(({ label, path }) => (
    <li key={label}>
      <Link
        to={path}
        className="text-gray-600 hover:text-gray-800 transition-all duration-200 ease-linear"
        aria-label={label}
      >
        {label}
      </Link>
    </li>
  ));
};
