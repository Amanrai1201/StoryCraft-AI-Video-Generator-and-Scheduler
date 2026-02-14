"use client";

import React from "react";
import { CreateProvider, useCreate } from "@/components/dashboard/create/CreateContext";
import { CreateStepper } from "@/components/dashboard/create/CreateStepper";
import { TopicStep } from "@/components/dashboard/create/TopicStep";
import { LanguageVoiceStep } from "@/components/dashboard/create/LanguageVoiceStep";
import { CreateFooter } from "@/components/dashboard/create/CreateFooter";

function CreatePageContent() {
    const { step, nextStep, prevStep, topic, customTopic, language, voice } = useCreate();

    const handleNext = () => {
        nextStep();
    };

    const handleBack = () => {
        prevStep();
    };

    // Determine if next is active based on current step validation
    const isNextDisabled = () => {
        if (step === 1) {
            return !topic && !customTopic;
        }
        if (step === 2) {
            return !language || !voice;
        }
        return false; // For now, other steps are always enabled (placeholders)
    };

    return (
        <div className="container mx-auto py-8">
            <CreateStepper />

            <div className="mt-8">
                {step === 1 && <TopicStep />}
                {step === 2 && <LanguageVoiceStep />}
                {step > 2 && (
                    <div className="text-center py-20 text-muted-foreground">
                        {/* Placeholder for future steps */}
                        <h3 className="text-2xl font-bold">Step {step}</h3>
                        <p>Content coming soon...</p>
                    </div>
                )}
            </div>

            <CreateFooter
                onNext={handleNext}
                onBack={handleBack}
                isNextDisabled={isNextDisabled()}
                showBack={step > 1}
                isLastStep={step === 6}
            />
        </div>
    );
}

export default function CreatePage() {
    return (
        <CreateProvider>
            <CreatePageContent />
        </CreateProvider>
    );
}
