import { drizzle } from "drizzle-orm/node-postgres";
import {
  products,
  projects,
  productReviews,
  productCategories,
  users,
} from "./schema";
import * as schema from "./schema";
import { seed } from "drizzle-seed";

import "dotenv/config";
async function main() {
  console.log("Seeding started!");
  const db_env = process.env.DATABASE_URL;
  if (!db_env) {
    console.error("no db env given");
    return;
  }

  const db = drizzle(db_env, { schema });

  await seed(db, {
    projects,
    users,
    productCategories,
    //productReviews,
    products,
  }).refine((f) => {
    return {
      users: {
        count: 20,
        columns: {
          id: f.uuid(),
          name: f.fullName(),
          email: f.email(),
        },
        with: {
          projects: 500,
        },
      },
      productCategories: {
        count: 5000,
      },
      products: {
        count: 1000,
        columns: {
          description: f.loremIpsum({
            sentencesCount: 2,
          }),
          price: f.number({
            minValue: 0.01,
            maxValue: 100000,
          }),
        },
      },
    };
  });
  const seeded_users = await db.query.users.findMany();
  const user_ids = seeded_users.map((user) => user.id);
  await seed(db, {
    productReviews,
  }).refine((f) => {
    return {
      productReviews: {
        count: 20000,
        columns: {
          rating: f.int({
            minValue: 0,
            maxValue: 100,
          }),
          review: f.loremIpsum({
            sentencesCount: 4,
          }),
          customerId: f.valuesFromArray({ values: user_ids }),
          productId: f.int({
            minValue: 1,
            maxValue: 1000,
          }),
        },
      },
    };
  });
  console.log("seeding ended!");
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
