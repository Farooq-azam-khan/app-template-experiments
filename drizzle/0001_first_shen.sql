CREATE TABLE "test-pg_project" (
	"userId" text NOT NULL,
	"project_name" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "test-pg_project" ADD CONSTRAINT "test-pg_project_userId_test-pg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."test-pg_user"("id") ON DELETE cascade ON UPDATE no action;