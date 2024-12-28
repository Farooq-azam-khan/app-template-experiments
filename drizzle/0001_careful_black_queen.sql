CREATE INDEX "product_category_name_idx" ON "test-pg_product_category" USING btree ("name");--> statement-breakpoint
CREATE INDEX "product_id_fk_idx" ON "test-pg_product_review" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_name_idx" ON "test-pg_product" USING btree ("name");