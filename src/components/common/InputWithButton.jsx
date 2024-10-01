"use client";

import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";


export function InputWithButton({ setResponse, setLoading, setOpen }) {
    const [app, setApp] = useState("github");
    const [instruction, setInstruction] = useState("");
    const [entityId, setEntityId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        await fetch('/api/run-agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ instruction: instruction, app: app, entityId: entityId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                setOpen(true);
                setResponse(data.response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setLoading(false);
    }

    useEffect(() => {
        setEntityId(localStorage.getItem("entityId"));
    }, []);

    return (
        <div className="flex w-full max-w-xl items-center space-x-4 my-5">
            <Select onValueChange={(value) => setApp(value)} defaultValue={app}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a app" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Apps</SelectLabel>
                        <SelectItem value="github">Github</SelectItem>
                        <SelectItem value="gmail">Gmail</SelectItem>
                        <SelectItem value="youtube">Youtube</SelectItem>
                        <SelectItem value="googledocs">Google Docs</SelectItem>
                        <SelectItem value="googlecalendar">Google Calendar</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Input type="text" placeholder="Ask a question..." className="h-12 w-full" value={instruction} onChange={(e) => setInstruction(e.target.value)} />
            <button type="submit" className=" inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] py-3.5 px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group/ask-btn" onClick={handleSubmit}>
                <PaperPlaneIcon className="h-4 w-4 group-hover/ask-btn:-rotate-45 transition duration-500" />
            </button>
        </div>
    )
}
