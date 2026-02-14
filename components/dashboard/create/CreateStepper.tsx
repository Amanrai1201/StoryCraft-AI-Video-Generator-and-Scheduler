"use client";

import React from "react";
import { useCreate } from "./CreateContext";
import { cn } from "@/lib/utils";

export function CreateStepper() {
    const { step } = useCreate();
    const totalSteps = 6;

    return (
        <div className="w-full py-8 space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                    Step {step} of {totalSteps}
                </span>
            </div>

            <div className="flex gap-2 w-full h-1.5">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNum = index + 1;
                    const isActive = stepNum === step;
                    const isCompleted = stepNum < step;

                    return (
                        <div
                            key={stepNum}
                            className={cn(
                                "h-full flex-1 rounded-full transition-all duration-300",
                                isActive ? "bg-primary w-[30%]" :
                                    isCompleted ? "bg-primary/60" : "bg-zinc-200 dark:bg-zinc-800"
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
