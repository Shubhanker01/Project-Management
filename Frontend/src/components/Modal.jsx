import { X } from "lucide-react";

export default function Modal({ isOpen, setOpen, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md">
                <div className="relative left-[90%] cursor-pointer" onClick={() => { setOpen(!open) }}>
                    <span className="text-zinc-400"><X size={20} /></span>
                </div>
                {children}
            </div>
        </div>
    );
}