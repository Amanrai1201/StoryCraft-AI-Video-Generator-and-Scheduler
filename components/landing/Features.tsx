import {
    Clapperboard,
    CalendarClock,
    Mail,
    Sparkles,
    Share2,
    Zap
} from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "AI Video Generation",
        description: "Turn text prompts into engaging videos with AI-generated visuals, voiceovers, and captions instantly."
    },
    {
        icon: CalendarClock,
        title: "Smart Scheduling",
        description: "Plan your content calendar ahead. Auto-post to YouTube, Instagram, and TikTok at optimal times."
    },
    {
        icon: Share2,
        title: "Multi-Platform Publish",
        description: "Create once, publish everywhere. Auto-resize and format content for Shorts, Reels, and TikTok."
    },
    {
        icon: Mail,
        title: "Email Marketing",
        description: "Convert your video content into newsletters and email campaigns to engage your list."
    },
    {
        icon: Clapperboard,
        title: "Auto-Editing",
        description: "AI automatically trims silence, adds b-roll, and syncs music to the beat of your video."
    },
    {
        icon: Zap,
        title: "Viral Optimization",
        description: "Our AI analyzes trends to suggest hooks and formats that are most likely to go viral."
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to scale</h2>
                    <p className="text-xl text-muted-foreground">
                        Streamline your content creation workflow with our powerful suite of AI tools designed for creators and marketers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
