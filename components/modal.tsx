import { ReactElement } from "react";

interface ModalProps {
  onClose: () => void;
  readonly children: ReactElement;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="bg-slate-300 bg-opacity-50 flex justify-center items-center w-screen h-screen top-0 left-0 absolute">
      <div className="flex justify-center items-center relative w-1/2 h-1/2 bg-slate-800 rounded-md text-slate-300">
        <button className="absolute border-2 border-slate-300 rounded-full p-3 top-3 right-5 hover:scale-105" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
