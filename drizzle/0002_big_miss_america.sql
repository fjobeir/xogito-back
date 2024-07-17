CREATE TABLE IF NOT EXISTS "take-home-fullstack_not_found" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_id" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "take-home-fullstack_not_found_github_id_unique" UNIQUE("github_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "not_found_github_id_idx" ON "take-home-fullstack_not_found" ("github_id");