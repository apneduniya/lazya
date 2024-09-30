"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { getAppImage } from "@/utils/common";


export function SupportedApps() {
    const ref = useRef(null);
    const id = useId();
    const [connectApps, setConnectApps] = useState([]);
    const [entityId, setEntityId] = useState("");

    useEffect(() => {

        setEntityId(localStorage.getItem("entityId"));

        const connectedApps = localStorage.getItem("connectedApps");
        if (connectedApps) {
            setConnectApps(JSON.parse(connectedApps));
        }
    }, []);

    useOutsideClick(ref, () => setActive(null));

    const handleConnect = (e) => {
    }

    return (<>
        <ul className="max-w-2xl mx-auto w-full gap-4">
            {cards.map((card, index) => (
                <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    key={`card-${card.title}-${id}`}
                    className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
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
                    <motion.button
                        layoutId={`button-${card.title}-${id}`}
                        className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
                        {card.ctaText}
                    </motion.button>
                </motion.div>
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
        ctaText: "Connect",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                (<p>Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br />Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>)
            );
        },
    },
    {
        id: "gmail",
        description: "Send and manage emails.",
        title: "Gmail",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/d9b539471e551d6c14ffd442d172e476edd44b33/gmail.svg",
        ctaText: "Connect",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                (<p>Babu Maan, a legendary Punjabi singer, is renowned for his soulful
                    voice and profound lyrics that resonate deeply with his audience. Born
                    in the village of Khant Maanpur in Punjab, India, he has become a
                    cultural icon in the Punjabi music industry. <br /> <br />His songs
                    often reflect the struggles and triumphs of everyday life, capturing
                    the essence of Punjabi culture and traditions. With a career spanning
                    over two decades, Babu Maan has released numerous hit albums and
                    singles that have garnered him a massive fan following both in India
                    and abroad.
                </p>)
            );
        },
    },

    {
        id: "youtube",
        description: "Youtube actions to interact with youtube app",
        title: "Youtube",
        src: "https://banner2.cleanpng.com/20190126/ixu/kisspng-youtube-portable-network-graphics-logo-image-compu-5c4bf8b8ef3b19.2833872615484827449799.jpg",
        ctaText: "Connect",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                (<p>Metallica, an iconic American heavy metal band, is renowned for their
                    powerful sound and intense performances that resonate deeply with
                    their audience. Formed in Los Angeles, California, they have become a
                    cultural icon in the heavy metal music industry. <br /> <br />Their
                    songs often reflect themes of aggression, social issues, and personal
                    struggles, capturing the essence of the heavy metal genre. With a
                    career spanning over four decades, Metallica has released numerous hit
                    albums and singles that have garnered them a massive fan following
                    both in the United States and abroad.
                </p>)
            );
        },
    },
    {
        id: "googledocs",
        description: "Perform various document-related actions.",
        title: "Google Docs",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/853011bff173624654a8f7b64b2399cf2d9e84b3/google-docs.svg",
        ctaText: "Connect",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                (<p>Led Zeppelin, a legendary British rock band, is renowned for their
                    innovative sound and profound impact on the music industry. Formed in
                    London in 1968, they have become a cultural icon in the rock music
                    world. <br /> <br />Their songs often reflect a blend of blues, hard
                    rock, and folk music, capturing the essence of the 1970s rock era.
                    With a career spanning over a decade, Led Zeppelin has released
                    numerous hit albums and singles that have garnered them a massive fan
                    following both in the United Kingdom and abroad.
                </p>)
            );
        },
    },
    {
        id: "googlecalendar",
        description: "Perform various calendar-related actions.",
        title: "Google calendar",
        src: "https://raw.githubusercontent.com/SamparkAI/open-logos/d9b539471e551d6c14ffd442d172e476edd44b33/google-calendar.svg",
        ctaText: "Connect",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                (<p>
                    Hello world
                </p>)
            );
        },
    },
];
