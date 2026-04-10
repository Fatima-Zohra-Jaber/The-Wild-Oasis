import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-xs z-50">
      <div className="relative max-h-[90%] max-w-[80%] rounded-lg shadow-lg bg-white p-8">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <HiXMark size={20} />
        </button>

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
