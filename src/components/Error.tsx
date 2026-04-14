import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-red-600 dark:text-red-400">
      <HiOutlineExclamationTriangle size={40} />
      <p className="text-base font-semibold dark:text-white">
        Something went wrong
      </p>
      <p className="max-w-sm text-sm dark:text-slate-300">{message}</p>
    </div>
  );
}
export default Error;
