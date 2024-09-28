"use client";

import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export function InputWithButton() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-4 my-5">
            <Input type="text" placeholder="Ask a question..." className="h-12 w-full" />
            <button type="submit" className=" inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] py-3.5 px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group/ask-btn">
                <PaperPlaneIcon className="h-4 w-4 group-hover/ask-btn:-rotate-45 transition duration-500" />
            </button>
        </div>
    )
}
