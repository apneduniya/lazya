"use client";

import { DotBackground } from "@/components/common/DotBackground";
import { InputWithButton } from "@/components/common/InputWithButton";
import { PromptSuggestionButton } from "@/components/common/PromptSuggestionButtton";
import { SupportedApps } from "@/components/section/SupportedApps";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { GearIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from 'react-markdown';


export default function Home() {
    const [entityId, setEntityId] = useState("");
    const words = ["scheduling meetings", "sending mails", "adding tasks", "note making"];
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [renderResponse, setRenderResponse] = useState([]);

    const randomEntityId = () => {
        return `lazyA-${Math.random().toString(32).substring(2, 34)}`;
    }

    useEffect(() => {
        const localEntityId = localStorage.getItem("entityId");

        if (localEntityId) {
            setEntityId(localEntityId);
        } else {
            const newEntityId = randomEntityId();
            localStorage.setItem("entityId", newEntityId);
            setEntityId(newEntityId);
        }
    }, []);

    useEffect(() => {
        if (response) {
            setOpen(true);
        }
    }, [response]);

    useEffect(() => {
        // Function to ensure that we remove the colon (:) if the response starts with it
        const removeColonIfPresent = (response) => {
            // Trim any extra whitespace for consistency
            const trimmedResponse = response.trim();

            // If it starts with ': ', remove ':' and any leading space
            if (trimmedResponse.startsWith(':')) {
                return trimmedResponse.substring(1).trim(); // Removes ':' and leading spaces
            }

            // If it doesn't start with ':', return the response as-is
            return trimmedResponse;
        };

        // Adjust the response by removing the leading colon (if present)
        const adjustedResponse = removeColonIfPresent(response);

        // Split the response on '\n' and map over each line to render it as markdown
        const parsedResponse = adjustedResponse.split('\n').map((line, index) => (
            <ReactMarkdown key={index}>{line}</ReactMarkdown>
        ));

        // Update the state with the parsed response
        setRenderResponse(parsedResponse);
    }, [response]); // This effect will re-run whenever 'response' changes

    return (
        <>
            <div className="h-full w-full">
                {/* Dialog for Response */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="!max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Response</DialogTitle>
                            <DialogDescription>
                                <div className="mt-5">
                                    {renderResponse}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Modal>
                    <DotBackground className="!fixed top-0 left-0 z-0" />
                    {/* Header */}
                    <div className="h-full w-full relative z-10">
                        <div className="w-full fixed top-0 py-6 px-8 flex items-center justify-between">
                            <ModalTrigger className="p-0">
                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
                                    <GearIcon className="h-4 w-4" />
                                </div>
                            </ModalTrigger>
                            <Badge variant="secondary" className="h-min">Powered by Gaia 🌱</Badge>
                        </div>
                        {/* Not Chat */}
                        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center">
                            {
                                loading && (
                                    <Alert className="max-w-[500px]">
                                        <RocketIcon className="h-4 w-4" />
                                        <AlertTitle>Loading</AlertTitle>
                                        <AlertDescription>
                                            Just wait for few seconds, we are working on it 😉
                                        </AlertDescription>
                                    </Alert>
                                )
                            }
                            <div className="font-heading text-pretty text-center text-[22px] font-semibold tracking-tighter sm:text-[30px] md:text-[36px] mt-5">
                                Automate
                                <FlipWords words={words} />
                            </div>
                            <h2 className="text-balance text-center text-sm text-gray-400">Generate agents, ask questions, and much more.</h2>
                            <InputWithButton setResponse={setResponse} setLoading={setLoading} setOpen={setOpen} />
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <PromptSuggestionButton text="Star GaiaNet-AI/gaianet-node repository in GitHub" />
                                <PromptSuggestionButton text="Create a document in Google Docs, named lazyA and write GaiaNet is best ;)" />
                                <PromptSuggestionButton text="Send mail to jhon@example.com that I won the hackathon" />
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <ModalBody className="h-[80%]">
                        <ModalContent>
                            <h1 className="font-heading text-pretty text-[20px] font-semibold tracking-tighter sm:text-[26px] md:text-[28px]">
                                Supported Apps
                            </h1>
                            <div className="mt-5">
                                <SupportedApps />
                            </div>
                        </ModalContent>
                    </ModalBody>
                </Modal>
            </div >
        </>
    );
}
