import { LoaderCircle } from "lucide-react";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center gap-4">

                <LoaderCircle className="h-14 w-14 animate-spin text-indigo-500" />

                <p className="text-slate-300 text-lg font-medium">
                    Loading...
                </p>

            </div>
        </div>
    );
}