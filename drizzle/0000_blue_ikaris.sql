CREATE TABLE "test-pg_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "test-pg_authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "test-pg_authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "test-pg_order_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_product_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_product_review" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"customer_id" text NOT NULL,
	"rating" integer NOT NULL,
	"review" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_project" (
	"userId" text NOT NULL,
	"project_name" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test-pg_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "test-pg_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "test-pg_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "test-pg_account" ADD CONSTRAINT "test-pg_account_userId_test-pg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."test-pg_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_authenticator" ADD CONSTRAINT "test-pg_authenticator_userId_test-pg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."test-pg_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_order_item" ADD CONSTRAINT "test-pg_order_item_order_id_test-pg_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."test-pg_order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_order_item" ADD CONSTRAINT "test-pg_order_item_product_id_test-pg_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."test-pg_product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_order" ADD CONSTRAINT "test-pg_order_customer_id_test-pg_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."test-pg_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_product_review" ADD CONSTRAINT "test-pg_product_review_product_id_test-pg_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."test-pg_product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_product_review" ADD CONSTRAINT "test-pg_product_review_customer_id_test-pg_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."test-pg_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_project" ADD CONSTRAINT "test-pg_project_userId_test-pg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."test-pg_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test-pg_session" ADD CONSTRAINT "test-pg_session_userId_test-pg_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."test-pg_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_category_name_idx" ON "test-pg_product_category" USING btree ("name");--> statement-breakpoint
CREATE INDEX "product_id_fk_idx" ON "test-pg_product_review" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_name_idx" ON "test-pg_product" USING btree ("name");--> statement-breakpoint
CREATE INDEX "project_name_idx" ON "test-pg_project" USING btree ("project_name");