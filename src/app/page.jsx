"use client";

import { DotBackground } from "@/components/common/DotBackground";
import { InputWithButton } from "@/components/common/InputWithButton";
import { PromptSuggestionButton } from "@/components/common/PromptSuggestionButtton";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { GearIcon } from "@radix-ui/react-icons";


export default function Home() {
    const words = ["scheduling meetings", "sending mails", "adding tasks", "note making"];

    return (
        <>
            <div className="h-full w-full">
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
                            <div className="font-heading text-pretty text-center text-[22px] font-semibold tracking-tighter sm:text-[30px] md:text-[36px]">
                                Automate
                                <FlipWords words={words} />
                            </div>
                            <h2 class="text-balance text-center text-sm text-gray-400">Generate agents, ask questions, and much more.</h2>
                            <InputWithButton />
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <PromptSuggestionButton text="Star GaiaNet-AI/gaianet-node repo on Github" />
                                <PromptSuggestionButton text="I have a meeting with Gaia team at 5PM today" />
                                <PromptSuggestionButton text="Send mail to jhon@example.com that I won the hackathon" />
                            </div>
                        </div>
                    </div>
                    <ModalBody>
                        <ModalContent>
                            <h1 className="font-heading text-pretty text-[20px] font-semibold tracking-tighter sm:text-[26px] md:text-[28px]">
                                Connected Apps
                            </h1>
                        </ModalContent>
                    </ModalBody>
                </Modal>
            </div >
        </>
    );
}
