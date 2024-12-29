import { Button } from "@/components/ui/button";
import { signIn, auth } from "@/auth";

export default async function Login() {
  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {session?.user ? (
          <div>Logged in as {session.user.email}</div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button type="submit">Sign In with GitHub</Button>
          </form>
        )}
      </main>
    </div>
  );
}
