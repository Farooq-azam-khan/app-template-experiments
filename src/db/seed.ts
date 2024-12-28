import { drizzle } from "drizzle-orm/node-postgres";
import { projects, productReviews, productCategories } from "./schema";
import { seed } from "drizzle-seed";

import "dotenv/config";
async function main() {
  console.log("Seeding started!");
  const db_env = process.env.DATABASE_URL;
  if (!db_env) {
    console.error("no db env given");
    return;
  }
  const db = drizzle(db_env);
  await seed(db, { projects, productReviews, productCategories }).refine(
    (f) => {
      return {
        projects: {
          count: 100,
          creator: f.valuesFromArray({ values: [1] }),
        },
      };
    },
  );
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
