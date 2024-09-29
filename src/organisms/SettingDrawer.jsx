import Heading from "../atoms/Heading";
import { useTheme } from "../contexts/ThemeContext";

function SettingDrawer() {
  const { isDark, setIsDark } = useTheme();
  return (
    <div className="px-4">
      <Heading label="Select Theme" size="text-xl" weight="font-medium" />

      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor="light-theme"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            id="light-theme"
            name="theme"
            value="light"
            checked={!isDark}
            onChange={() => setIsDark(false)}
          />
          <span className="text-gray-600 dark:text-gray-200">
            Light Theme
          </span>
        </label>
        <label
          htmlFor="dark-theme"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            id="dark-theme"
            name="theme"
            value="dark"
            checked={isDark}
            onChange={() => setIsDark(true)}
          />
          <span className="text-gray-600 dark:text-gray-200">Dark Theme</span>
        </label>
      </div>
    </div>
  );
}

export default SettingDrawer;
