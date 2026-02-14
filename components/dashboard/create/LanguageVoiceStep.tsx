"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCreate } from "./CreateContext";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, User } from "lucide-react";
import { Language, DeepgramVoices, FonadalabVoices } from "@/lib/voice-data";

export function LanguageVoiceStep() {
    const { language, setLanguage, voice, setVoice } = useCreate();
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Get selected language details
    const selectedLang = Language.find((l) => l.modelLangCode === language);

    // Get available voices based on selected language model
    const availableVoices = selectedLang?.modelName === "deepgram"
        ? DeepgramVoices
        : selectedLang?.modelName === "fonadalab"
            ? FonadalabVoices
            : [];

    // Handle audio playback
    const handlePlayPreview = (previewFile: string, voiceModelName: string) => {
        if (playingVoice === voiceModelName) {
            // Stop playing
            audioRef.current?.pause();
            setPlayingVoice(null);
        } else {
            // Start playing
            if (audioRef.current) {
                audioRef.current.pause();
            }

            const audio = new Audio(`/voice/${previewFile}`);
            audioRef.current = audio;

            audio.play();
            setPlayingVoice(voiceModelName);

            audio.onended = () => {
                setPlayingVoice(null);
            };
        }
    };

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
            <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Language & Voice
                </h2>
                <p className="text-muted-foreground text-lg">
                    Select the language and voice style for your video narration.
                </p>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
                <Label htmlFor="language-select" className="text-lg font-semibold">
                    Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language-select" className="h-14 text-lg">
                        <SelectValue placeholder="Select a language">
                            {selectedLang && (
                                <span className="flex items-center gap-2">
                                    <span className="text-2xl">{selectedLang.countryFlag}</span>
                                    <span>{selectedLang.language}</span>
                                </span>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {Language.map((lang) => (
                            <SelectItem key={lang.modelLangCode} value={lang.modelLangCode}>
                                <span className="flex items-center gap-2">
                                    <span className="text-xl">{lang.countryFlag}</span>
                                    <span>{lang.language}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Voice Selection */}
            {language && (
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Voice Style</Label>
                    <p className="text-sm text-muted-foreground">
                        Pick one voice that best fits your content style.
                    </p>

                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                        <div className="grid grid-cols-1 gap-4 pb-4">
                            {availableVoices.map((v) => (
                                <Card
                                    key={v.modelName}
                                    className={cn(
                                        "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md border-2",
                                        voice === v.modelName
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                    )}
                                    onClick={() => setVoice(v.modelName)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 flex-1">
                                                {/* Voice Icon */}
                                                <div className={cn(
                                                    "h-12 w-12 rounded-full flex items-center justify-center",
                                                    v.gender === "male"
                                                        ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                                        : "bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400"
                                                )}>
                                                    <User className="h-6 w-6" />
                                                </div>

                                                {/* Voice Details */}
                                                <div className="flex-1 space-y-1">
                                                    <h3 className="font-bold text-lg capitalize">
                                                        {v.modelName.replace(/-/g, " ")}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                        <span className="capitalize">{v.gender}</span>
                                                        <span>•</span>
                                                        <span className="capitalize">{v.model}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preview Button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePlayPreview(v.preview, v.modelName);
                                                }}
                                                className="gap-2 min-w-[100px]"
                                            >
                                                {playingVoice === v.modelName ? (
                                                    <>
                                                        <Pause className="h-4 w-4" />
                                                        Pause
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-4 w-4" />
                                                        Preview
                                                    </>
                                                )}
                                            </Button>

                                            {/* Selection Indicator */}
                                            {voice === v.modelName && (
                                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}

            {!language && (
                <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
                    <div className="text-center space-y-2">
                        <Volume2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                            Please select a language to view available voices
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
