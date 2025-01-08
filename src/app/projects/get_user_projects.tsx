import { redis, db } from "@/db";
import { Project, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function get_user_projects(user_id: string) {
  "use server";
  const cachedProjects: Project[] | null = await redis.get(
    `/projects/${user_id}`,
  );

  if (cachedProjects) {
    return cachedProjects;
  }
  const user_projects = await db.query.projects.findMany({
    where: eq(projects.creatorId, user_id),
    limit: 100,
  });
  await redis.set(`/projects/${user_id}`, user_projects, {
    ex: 10 * 60, // expires in minutes
  });
  return user_projects;
}
