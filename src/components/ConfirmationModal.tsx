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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
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
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <HiExclamationCircle className="text-red-500" size={32} />
          </div>
          <div>
            <h2 className="mb-1 text-[15px] font-medium text-stone-800">
              {title}
            </h2>
            <p className="text-[13px] leading-relaxed text-stone-700">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmationModal;
