import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <div>
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
    </div>
  );
}
