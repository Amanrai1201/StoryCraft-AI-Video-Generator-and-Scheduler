"use client";

import React, { useState, useEffect } from "react";
import { useCreate } from "./CreateContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ghost, Trophy, Bed, Lightbulb, History, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const niches = [
    {
        id: "scary_stories",
        title: "Scary Stories",
        description: "Chilling tales and urban legends to keep viewers on edge.",
        icon: Ghost,
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Inspiring quotes and stories to boost productivity and mindset.",
        icon: Trophy,
    },
    {
        id: "bedtime_stories",
        title: "Bedtime Stories",
        description: "Calm and soothing stories for a relaxing end to the day.",
        icon: Bed,
    },
    {
        id: "fun_facts",
        title: "Interesting Facts",
        description: "Mind-blowing trivia and educational tidbits about the world.",
        icon: Lightbulb,
    },
    {
        id: "history",
        title: "History",
        description: "Dive into the past with engaging historical narratives.",
        icon: History,
    },
    {
        id: "fitness",
        title: "Health & Fitness",
        description: "Quick tips for a better lifestyle and workout inspiration.",
        icon: BookOpen,
    },
];

export function TopicStep() {
    const { topic, setTopic, customTopic, setCustomTopic } = useCreate();
    const [activeTab, setActiveTab] = useState<"niche" | "custom">("niche");

    // Sync initial state if custom topic is present but active tab is default
    useEffect(() => {
        if (customTopic && !topic) {
            setActiveTab("custom");
        }
    }, []);

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-24">
            <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Select your niche
                </h2>
                <p className="text-muted-foreground text-lg">
                    Choose a niche that best fits your series or create a custom one.
                </p>
            </div>

            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full w-fit">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("niche")}
                    className={cn(
                        "rounded-full px-6 py-2 h-auto text-sm font-medium transition-all",
                        activeTab === "niche"
                            ? "bg-white dark:bg-zinc-950 text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                    )}
                >
                    Available Niche
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("custom")}
                    className={cn(
                        "rounded-full px-6 py-2 h-auto text-sm font-medium transition-all",
                        activeTab === "custom"
                            ? "bg-white dark:bg-zinc-950 text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                    )}
                >
                    Custom Niche
                </Button>
            </div>

            {activeTab === "niche" ? (
                <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        {niches.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => {
                                    setTopic(n.id);
                                    setCustomTopic(""); // Clear custom topic when selecting a niche
                                }}
                                className={cn(
                                    "cursor-pointer group relative overflow-hidden rounded-xl border-2 p-6 transition-all hover:border-primary/50 hover:shadow-md",
                                    topic === n.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border bg-card"
                                )}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">{n.title}</h3>
                                        {topic === n.id && (
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {n.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <Card className="border-2 border-dashed shadow-none">
                    <CardHeader>
                        <CardTitle>Custom Theme</CardTitle>
                        <CardDescription>
                            Describe the specific topic or theme you want for your video in detail.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Label htmlFor="custom-topic">Topic Description</Label>
                        <Input
                            id="custom-topic"
                            placeholder="e.g., A documentary about deep sea exploration focusing on bioluminescent creatures..."
                            value={customTopic}
                            onChange={(e) => {
                                setCustomTopic(e.target.value);
                                setTopic(""); // Clear selected niche when typing custom topic
                            }}
                            className="h-12 text-lg"
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
