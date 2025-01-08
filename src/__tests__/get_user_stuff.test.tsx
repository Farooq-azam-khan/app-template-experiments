import { expect, test } from "vitest";
//import { render, screen } from "@testing-library/react";
import { get_user_projects } from "../app/projects/get_user_projects";

test("Returns an empty array when no projects are found", async () => {
  const result = await get_user_projects("user-does-not-exist");
  expect(result).toStrictEqual([]);
});
test("Returns the first 100 projects created by a specific user ID", async () => {
  const user_id = "311775df-52a3-42be-dd1b-ccd00fd524ff";
  const result = await get_user_projects(user_id);
  expect(result.length).toStrictEqual(100);
});
