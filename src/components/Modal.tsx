import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import Button from "./Button";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 dark:bg-black/50 backdrop-blur-xs">
      <div className="relative max-h-[90%] max-w-[80%] rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
        <Button
          variant="base"
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <HiXMark size={20} />
        </Button>

        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
