import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function Header() {
    return (
        <header className="flex items-center justify-end px-6 py-4 border-b border-border bg-background">
            <Button variant="outline" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
                <span className="sr-only">User Profile</span>
            </Button>
        </header>
    );
}
