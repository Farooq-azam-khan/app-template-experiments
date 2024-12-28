import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Redis } from "@upstash/redis";
import "dotenv/config";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
