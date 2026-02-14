"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Clapperboard,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    Upload,
    User,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";


const sidebarLinks = [
    { name: "Series", href: "/dashboard/series", icon: Clapperboard },
    { name: "Videos", href: "/dashboard/videos", icon: Video },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    return (
        <div className="flex flex-col h-full w-64 bg-background border-r border-border">
            {/* Header / Logo */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                    <span className="font-bold text-xl">StoryCraft</span>
                </div>

                {/* Create New Series Button */}
                <Button className="w-full justify-start gap-2 mb-6" size="lg">
                    <Plus className="w-5 h-5" />
                    Create New Series
                </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <link.icon className="w-6 h-6" />
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border mt-auto space-y-2">
                <Link
                    href="/dashboard/upgrade"
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                >
                    <Upload className="w-6 h-6" />
                    Upgrade
                </Link>
                <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                >
                    <User className="w-6 h-6" />
                    Profile
                </Link>
            </div>
        </div>
    );
}
