import { createPortal } from "react-dom";
import { HiXMark, HiExclamationCircle } from "react-icons/hi2";
import Button from "./Button";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmationModal({
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute top-3 right-3"
          variant="base"
          onClick={onClose}
        >
          <HiXMark size={18} />
        </Button>

        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
            <HiExclamationCircle
              className="text-red-500 dark:text-red-500/70"
              size={32}
            />
          </div>
          <div>
            <h2 className="mb-1 text-[15px] font-medium text-stone-800 dark:text-slate-100">
              {title}
            </h2>
            <p className="text-[13px] leading-relaxed text-stone-700 dark:text-slate-400">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmationModal;
