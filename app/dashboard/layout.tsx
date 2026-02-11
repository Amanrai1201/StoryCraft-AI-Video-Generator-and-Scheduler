
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Sync user to Supabase
    const supabase = await createClient();

    // Check if user exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single();

    if (!existingUser) {
        // Insert user if not exists
        const { error } = await supabase.from("users").insert({
            clerk_id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        });

        if (error) {
            console.error("Error syncing user to Supabase:", error);
            // We can decide to throw or just log. For now, we log.
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
