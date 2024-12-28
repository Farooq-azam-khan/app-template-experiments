import { drizzle } from "drizzle-orm/node-postgres";
import {
  products,
  users,
  projects,
  orders,
  orderItems,
  productCategories,
  productReviews,
} from "./schema";
import { seed } from "drizzle-seed";

import "dotenv/config";
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { productCategories });
}

main();
