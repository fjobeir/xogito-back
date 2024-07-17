import { type githubUsers } from "~/server/db/schema";

export type GithubError = {
  message: string;
  documentation_url: string;
};

export type GithubUserRow = typeof githubUsers.$inferInsert;

export type OriginalGithubUserRow = Omit<
  GithubUserRow,
  "githubId" | "registration_date"
> & {
  created_at: string;
  updated_at: string;
  node_id: string;
  gravatar_id: string;
  id: number;
  login: string;
};
