import {
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";

import { useLogout } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { logout, isLoading } = useLogout();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-end gap-2 border-b border-gray-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
      <button
        onClick={toggleTheme}
        className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        title="Theme"
      >
        {theme === "light" ? <HiOutlineMoon size={18} /> : <HiOutlineSun size={18} />}
      </button>
      <button
        className="text-red-700 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
        onClick={() => logout()}
        disabled={isLoading}
        title="Logout"
      >
        <HiArrowRightOnRectangle  size={18}/>
      </button>
    </div>
  );
}

export default Header;
