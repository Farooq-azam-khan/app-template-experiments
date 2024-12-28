import { auth } from "@/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function get_user_projects(user_id: string) {
  // TODO: add a caching layer
  "use server";
  return await db.query.projects.findMany({
    where: eq(projects.creator, user_id),
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
      <Table>
        <TableCaption>A list of your recent projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user_projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.project_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Projects</TableCell>
            <TableCell className="text-right">{user_projects.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
