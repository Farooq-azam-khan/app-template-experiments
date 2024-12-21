import { drizzle } from "drizzle-orm/libsql";

// TODO: db config loaded from .env.* file
const db = drizzle({ connection: { url: "local.db" } });
