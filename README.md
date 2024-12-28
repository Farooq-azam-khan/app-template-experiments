# Experimenting with Tech
* NextJS v15 (react v19)
* schadcn
* tailwind
* authjs (v5@beta) `pnpm dlx auth secret` `openssl rand -base64 12`
* sentry - error tracking
* sentry - user feedback
* upstash - for rate limiting

# Index creation Experiments
* getting 8k rows for a user with no indexes - takes 11ms.
```sql
EXPLAIN ANALYZE SELECT * FROM "test-pg_project" as p WHERE p."userId" = 1;
```
```
                                                      QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------
 Seq Scan on "test-pg_project" p  (cost=0.00..145.00 rows=8000 width=15) (actual time=0.030..11.171 rows=8000 loops=1)
   Filter: ("userId" = 1)
 Planning Time: 0.146 ms
 Execution Time: 11.531 ms
(4 rows)
```

```sql
SELECT * FROM pg_indexes WHERE schemaname = 'public' AND tablename='test-pg_project';
```

```
 schemaname |    tablename    |      indexname       | tablespace |                                        indexdef
------------+-----------------+----------------------+------------+-----------------------------------------------------------------------------------------
 public     | test-pg_project | test-pg_project_pkey |            | CREATE UNIQUE INDEX "test-pg_project_pkey" ON public."test-pg_project" USING btree (id)
(1 row)
```
