"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Loader from "../common/Loader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export function SupportedApps() {
    const ref = useRef(null);
    const id = useId();
    const [loaderLoading, setLoaderLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    useOutsideClick(ref, () => setActive(null));

    return (<>
        <ul className="max-w-2xl mx-auto w-full gap-4">
            {
                alert && (
                    <Alert className="mb-5">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription>
                            Reload this page, once you have connected your account to reflect the changes.
                        </AlertDescription>
                    </Alert>
                )
            }
            <Loader loading={loaderLoading} />
            {cards.map((card, index) => (
                <ConnectApp
                    key={index}
                    card={card}
                    setLoaderLoading={setLoaderLoading}
                    setAlert={setAlert}
                    id={index}
                />
            ))}
        </ul>
    </>);
}

export const CloseIcon = () => {
    return (
        (<motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>)
    );
};

const cards = [
    {
        id: "github",
        description: "Dev-Tools | Version Control | Collaboration",
        title: "Github",
        src: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    },
    {
        id: "gmail",
        description: "Send and manage emails.",
        title: "Gmail",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/d9b539471e551d6c14ffd442d172e476edd44b33/gmail.svg",
    },

    {
        id: "youtube",
        description: "Youtube actions to interact with youtube app",
        title: "Youtube",
        src: "https://banner2.cleanpng.com/20190126/ixu/kisspng-youtube-portable-network-graphics-logo-image-compu-5c4bf8b8ef3b19.2833872615484827449799.jpg",
    },
    {
        id: "googledocs",
        description: "Perform various document-related actions.",
        title: "Google Docs",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/853011bff173624654a8f7b64b2399cf2d9e84b3/google-docs.svg",
    },
    {
        id: "googlecalendar",
        description: "Perform various calendar-related actions.",
        title: "Google calendar",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/d9b539471e551d6c14ffd442d172e476edd44b33/google-calendar.svg",
    },
];


const ConnectApp = ({ card, id, setLoaderLoading, setAlert }) => {
    const [alreadyConnected, setAlreadyConnected] = useState(false);

    useEffect(() => {
        async function checkConnectionStatus() {

            setLoaderLoading(true);

            const entityId = localStorage.getItem("entityId");

            const response = await fetch(`/api/check-connect-app/${entityId}/${card.id}`);
            const data = await response.json();

            if (data.connected) {
                setAlreadyConnected(true);
            } else {
                setAlreadyConnected(false);
            }

            setLoaderLoading(false);

        }

        checkConnectionStatus();
    }, []);

    const handleConnect = async () => {
        setLoaderLoading(true);

        const entityId = localStorage.getItem("entityId");

        const response = await fetch(`/api/connect-app/${entityId}/${card.id}`);
        const data = await response.json();

        if (data.connected) {
            setAlreadyConnected(true);
            setLoaderLoading(false);
        } else {
            setAlreadyConnected(false);
            setLoaderLoading(false);
            setAlert(true);
            window.open(data.redirectUrl, "_blank");
        }
    }

    return (
        <>
            <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={`card-${card.title}-${id}`}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
                <div className="flex gap-4 flex-col md:flex-row ">
                    <motion.div layoutId={`image-${card.title}-${id}`}>
                        <Image
                            width={100}
                            height={100}
                            src={typeof card.src === "function"
                                ? card.src()
                                : card.src}
                            alt={card.title}
                            className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top" />
                    </motion.div>
                    <div className="">
                        <motion.h3
                            layoutId={`title-${card.title}-${id}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                            {card.title}
                        </motion.h3>
                        <motion.p
                            layoutId={`description-${card.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                            {card.description}
                        </motion.p>
                    </div>
                </div>
                {
                    !alreadyConnected ? (
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                            onClick={handleConnect}
                        >
                            Connect
                        </motion.button>
                    ) : (
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-[#818182] text-[#151518] mt-4 md:mt-0"
                            disabled
                        >
                            Connected
                        </motion.button>
                    )
                }
            </motion.div>
        </>
    )
}

