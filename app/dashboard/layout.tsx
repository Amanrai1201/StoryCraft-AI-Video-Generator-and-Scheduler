
import { currentUser } from "@clerk/nextjs/server";
import { createClient, createAdminClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

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
    const supabase = await createAdminClient();

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error fetching user from Supabase:", JSON.stringify(fetchError, null, 2));
        if (fetchError instanceof Error) {
            console.error("Error message:", fetchError.message);
        }
    }

    if (!existingUser) {
        // Insert user if not exists
        const { error } = await supabase.from("users").insert({
            user_id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        });

        if (error) {
            console.error("Error syncing user to Supabase:", error);
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
