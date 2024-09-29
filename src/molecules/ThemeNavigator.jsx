import { useTheme } from "../contexts/ThemeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

function ThemeNavigator() {
  const { isDark, toggleTheme } = useTheme();

  return isDark ? (
    <IoMdSunny
      size="24"
      title="Light Mode"
      aria-label="Light Mode"
      className="cursor-pointer text-amber-500"
      onClick={toggleTheme}
    />
  ) : (
    <BsFillMoonStarsFill
      size="24"
      title="Dark Mode"
      aria-label="Dark Mode"
      className="cursor-pointer text-amber-500"
      onClick={toggleTheme}
    />
  );
}

export default ThemeNavigator;
