import { NavLink } from "react-router-dom";
import logo from "../assets/logo-light.png";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function Sidebar() {
  const navItems = [
    { to: "/dashboard", label: "Home", icon: HiOutlineHome },
    { to: "/bookings", label: "Bookings", icon: HiOutlineCalendarDays },
    { to: "/cabins", label: "Cabins", icon: HiOutlineHomeModern },
    { to: "/users", label: "Users", icon: HiOutlineUsers },
    { to: "/settings", label: "Settings", icon: HiOutlineCog6Tooth },
  ];

  return (
    <aside className="p-6 w-52 2xl:w-65">
      <img src={logo} alt="App logo" className="w-28 2xl:w-32 mb-6 mx-auto" />

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded font-semibold text-stone-700 transition-colors 
              ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`text-lg 2xl:text-xl ${
                    isActive ? "text-purple-800/90" : "text-gray-500"
                  }`}
                />
                <span className="text-sm 2xl:text-md">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
