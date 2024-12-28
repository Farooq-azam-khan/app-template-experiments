import { drizzle } from "drizzle-orm/node-postgres";
import {
  users,
  products,
  projects,
  productReviews,
  productCategories,
} from "./schema";
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
  await seed(db, {
    projects,
    productCategories,
    productReviews,
    products,
  }).refine((f) => {
    return {
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
      productReviews: {
        count: 7000,
        columns: {
          rating: f.int({
            minValue: 0,
            maxValue: 100,
          }),
          review: f.loremIpsum({
            sentencesCount: 5,
          }),
          customerId: f.valuesFromArray({
            values: [1],
          }),

          productId: f.int({
            minValue: 1,
            maxValue: 100,
          }),
        },
      },
      projects: {
        count: 8000,
        columns: {
          project_name: f.companyName(),
          creator: f.valuesFromArray({
            values: [1],
          }),
        },
      },
    };
  });
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
