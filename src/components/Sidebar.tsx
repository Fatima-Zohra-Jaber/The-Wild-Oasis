import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";
import { useTheme } from "../hooks/useTheme";

function Sidebar() {
  const { theme } = useTheme();
  const logo = theme === "light" ? lightLogo : darkLogo;

  const navItems = [
    { to: "/dashboard", label: "Home", icon: HiOutlineHome },
    { to: "/bookings", label: "Bookings", icon: HiOutlineCalendarDays },
    { to: "/cabins", label: "Cabins", icon: HiOutlineHomeModern },
    { to: "/users", label: "Users", icon: HiOutlineUsers },
    { to: "/settings", label: "Settings", icon: HiOutlineCog6Tooth },
  ];

  return (
    <aside className="w-52 border-r border-gray-200 bg-white p-6 2xl:w-65 dark:border-slate-700 dark:bg-slate-800">
      <img src={logo} alt="App logo" className="mx-auto mb-6 w-28 2xl:w-32" />

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-4 py-2 font-semibold text-stone-700 transition-colors dark:text-slate-300 ${isActive ? "bg-gray-100 dark:bg-slate-700" : "hover:bg-gray-50 dark:hover:bg-slate-700"}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`text-lg 2xl:text-xl ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-500 dark:text-slate-400"
                  }`}
                />
                <span className="2xl:text-md dark:text-slate-300\ text-sm">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
