import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../hooks/useAuth";

function Header() {
  const { logout, isLoading } = useLogout();

  return (
    <div className="flex justify-between">
      <div>Header</div>
      <button
        className="text-red-700"
        onClick={() => logout()}
        disabled={isLoading}
      >
        <HiArrowRightOnRectangle />
      </button>
    </div>
  );
}

export default Header;
