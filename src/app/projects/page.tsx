import { auth } from "@/auth";
import { db } from "@/db";

async function get_user_projects(user_id: string) {
  // TODO: add a caching layer
  "use server";
  return await db.query.projects.findMany({
    where: (projects, { eq }) => eq(user_id, projects.creator),
  });
}

export default async function Projects() {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Not logged in</div>;
  }
  const user_projects = await get_user_projects(session.user.id);
  return (
    <div>
      <div>Projects for user {session.user.name}</div>
      <div>
        {user_projects.map((p) => (
          <div key={p.id}>{p.project_name}</div>
        ))}
      </div>
    </div>
  );
}
