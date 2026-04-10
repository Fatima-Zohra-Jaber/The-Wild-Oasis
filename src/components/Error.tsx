import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-red-600">
      <HiOutlineExclamationTriangle size={40} />
      <p className="text-base font-semibold">Something went wrong</p>
      <p className="max-w-sm text-sm">{message}</p>
    </div>
  );
}
export default Error;
