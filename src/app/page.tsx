import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

async function get_users() {
    "use server";
    const users = await db.query.users.findMany();
    return users;
}
export default async function Home() {
    const session = await auth();
    const users = await get_users();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {session?.user ? (
                    <div>
                        <div>Welcome {session.user.name}</div>
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <Button>Signout</Button>
                        </form>
                    </div>
                ) : (
                    <form
                        action={async () => {
                            "use server";
                            await signIn("github");
                        }}
                    >
                        <Button>Sign In</Button>
                    </form>
                )}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </footer>
        </div>
    );
}
