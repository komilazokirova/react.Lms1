import { X } from "lucide-react";

function Modal({ IsOpen, onClose, title, children }) {
    if (!IsOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] motion-safe:animate-[modalOverlayIn_240ms_ease-out]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-out motion-safe:animate-[modalContentIn_320ms_cubic-bezier(0.16,1,0.3,1)]"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>

    )
}
export default Modal