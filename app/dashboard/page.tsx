
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const user = await currentUser();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground">
                Hello, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
            </p>
        </div>
    );
}
