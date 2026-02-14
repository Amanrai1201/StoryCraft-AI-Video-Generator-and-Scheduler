import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent opacity-30 blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-secondary-foreground text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span>AI-Powered Video Creation</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    Create Viral Short Videos <br />
                    <span className="text-primary">In Seconds with AI</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    StoryCraft automatically generates, edits, and schedules engaging short-form videos for YouTube Shorts, Instagram Reels, and TikTok.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 cursor-pointer">
                                Get Started Free
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </SignedIn>
                    <Link
                        href="#demo"
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                    >
                        <Play className="mr-2 w-4 h-4 fill-current" />
                        Watch Demo
                    </Link>
                </div>

                {/* Placeholder for dashboard preview or video */}
                <div className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 p-2">
                    <div className="rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                        <div className="absolute bottom-6 left-6 text-left">
                            <p className="text-white/80 text-sm font-medium mb-1">See it in action</p>
                            <p className="text-white text-lg font-bold">Generating a viral story in 30s</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
