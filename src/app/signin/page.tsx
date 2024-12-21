import { Button } from "@/components/ui/button";
import { signIn, auth } from "@/auth";

export default async function Login() {
    const session = await auth();
    if (session?.user) {
        return <div>Logged in as {session.user.email}</div>;
    }
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <Button type="submit">Sign In with GitHub</Button>
        </form>
    );
}
