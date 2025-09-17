import { FaMoon, FaSun } from "react-icons/fa";
import { useAppContext } from "./context";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useAppContext();
  return (
    <div className="toggle-container">
      <button
        onClick={toggleDarkMode}
        className="dark-toggle"
        style={{ color: isDarkMode ? "#fff" : "#000" }}
      >
        {isDarkMode ? (
          <FaSun className="toggle-icon" />
        ) : (
          <FaMoon className="toggle-icon" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
