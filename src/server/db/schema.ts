// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `take-home-fullstack_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const githubUsers = createTable(
  "github_users",
  {
    id: serial("id").primaryKey(),
    githubId: integer("github_id").unique(),
    username: varchar("username", { length: 256 }).unique(),
    avatar_url: varchar("avatar_url", { length: 256 }),
    url: varchar("url", { length: 256 }),
    html_url: varchar("html_url", { length: 256 }),
    followers_url: varchar("followers_url", { length: 256 }),
    following_url: varchar("following_url", { length: 256 }),
    gists_url: varchar("gists_url", { length: 256 }),
    starred_url: varchar("starred_url", { length: 256 }),
    subscriptions_url: varchar("subscriptions_url", { length: 256 }),
    organizations_url: varchar("organizations_url", { length: 256 }),
    repos_url: varchar("repos_url", { length: 256 }),
    events_url: varchar("events_url", { length: 256 }),
    received_events_url: varchar("received_events_url", { length: 256 }),
    type: varchar("type", { length: 256 }),
    site_admin: boolean("site_admin"),
    name: varchar("name", { length: 256 }),
    company: varchar("company", { length: 256 }),
    blog: varchar("blog", { length: 256 }),
    location: varchar("location", { length: 256 }),
    email: varchar("email", { length: 256 }),
    hireable: boolean("hireable"),
    bio: varchar("bio", { length: 256 }),
    twitter_username: varchar("twitter_username", { length: 256 }),
    public_repos: integer("public_repos"),
    public_gists: integer("public_gists"),
    followers: integer("followers"),
    following: integer("following"),
    registration_date: timestamp("registration_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    githubIdIndex: index("github_id_idx").on(example.githubId),
    usernameIndex: index("username_idx").on(example.username),
  }),
);

export const notFound = createTable(
  "not_found",
  {
    id: serial("id").primaryKey(),
    githubId: integer("github_id").unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    githubIdIndex: index("not_found_github_id_idx").on(example.githubId),
  }),
);
