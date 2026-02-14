"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateFooterProps {
    onNext: () => void;
    onBack?: () => void;
    isNextDisabled?: boolean;
    isBackDisabled?: boolean;
    showBack?: boolean;
    nextLabel?: string;
    isLastStep?: boolean;
}

export function CreateFooter({
    onNext,
    onBack,
    isNextDisabled = false,
    isBackDisabled = false,
    showBack = true,
    nextLabel = "Continue",
    isLastStep = false,
}: CreateFooterProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background/80 backdrop-blur-sm z-50 md:pl-72">
            <div className="container mx-auto flex items-center justify-between max-w-4xl">
                {showBack ? (
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        disabled={isBackDisabled}
                        className="gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </Button>
                ) : (
                    <div /> /* Spacer */
                )}

                <Button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    size="lg"
                    className={cn(
                        "gap-2 min-w-[140px] rounded-full",
                        isLastStep ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
                    )}
                >
                    {nextLabel}
                    {isLastStep ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
}
