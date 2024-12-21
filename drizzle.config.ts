import "dotenv/config";
import { type Config } from "drizzle-kit";
export default {
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://postgres:pg-password@localhost:5432",
    },
    tablesFilter: ["test-pg_*"],
} satisfies Config;
