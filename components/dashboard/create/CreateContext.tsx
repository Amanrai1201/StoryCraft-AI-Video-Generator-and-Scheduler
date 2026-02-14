"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CreateContextType {
    step: number;
    setStep: (step: number) => void;
    // Step 1: Topic
    topic: string;
    setTopic: (topic: string) => void;
    customTopic: string;
    setCustomTopic: (topic: string) => void;
    // Future Steps State
    language: string;
    setLanguage: (lang: string) => void;
    voice: string;
    setVoice: (voice: string) => void;
    script: string;
    setScript: (script: string) => void;
    captionStyle: string;
    setCaptionStyle: (style: string) => void;

    nextStep: () => void;
    prevStep: () => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export const useCreate = () => {
    const context = useContext(CreateContext);
    if (!context) {
        throw new Error("useCreate must be used within a CreateProvider");
    }
    return context;
};

interface CreateProviderProps {
    children: ReactNode;
}

export const CreateProvider = ({ children }: CreateProviderProps) => {
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState("");
    const [customTopic, setCustomTopic] = useState("");
    const [language, setLanguage] = useState("");
    const [voice, setVoice] = useState("");
    const [script, setScript] = useState("");
    const [captionStyle, setCaptionStyle] = useState("");

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <CreateContext.Provider
            value={{
                step,
                setStep,
                topic,
                setTopic,
                customTopic,
                setCustomTopic,
                language,
                setLanguage,
                voice,
                setVoice,
                script,
                setScript,
                captionStyle,
                setCaptionStyle,
                nextStep,
                prevStep,
            }}
        >
            {children}
        </CreateContext.Provider>
    );
};
