import { createPortal } from "react-dom";
import { HiXMark, HiExclamationCircle } from "react-icons/hi2";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          onClick={onClose}
        >
          <HiXMark size={18} />
        </button>

        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <HiExclamationCircle className="text-red-500" size={32} />
          </div>
          <div>
            <h2 className="text-[15px] font-medium text-stone-800 mb-1">
              {title}
            </h2>
            <p className="text-[13px] leading-relaxed text-stone-700">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg border border-stone-200 px-4 py-2 text-[13px] font-medium text-stone-700 transition hover:bg-stone-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-600 transition hover:bg-red-100"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmationModal;