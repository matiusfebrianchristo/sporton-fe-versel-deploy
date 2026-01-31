import { useEffect } from "react";
import { FiX } from "react-icons/fi";

type TModalProps = {
    isOpen: Boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({isOpen, onClose, title, children}: TModalProps) => {
    useEffect(() => {
        if (!isOpen) return

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEsc)

        return () => {
            document.removeEventListener("keydown", handleEsc)
        }
    }, [isOpen, onClose])
    if (!isOpen) return null
     
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute bg-black/50 backdrop-blur-sm trasition-opacity w-full h-full" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl">
                <div className="flex justify-between items-center px-7 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-xl">{title}</h3>
                    <button onClick={onClose} className="p-4 hover:bg-gray-100 rounded-full"><FiX size={24}/></button>
                </div>
                <div className="p-7">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal