import { count, gte, max } from "drizzle-orm";
import { scheduleJob } from "node-schedule";
import { db } from "~/server/db";
import { githubUsers, notFound } from "~/server/db/schema";
import {
  type GithubError,
  type GithubUserRow,
  type OriginalGithubUserRow,
} from "./types";

const modifyGithubResponse = (
  apiResponse: OriginalGithubUserRow,
): GithubUserRow => {
  return {
    username: apiResponse.login,
    githubId: apiResponse.id,
    avatar_url: apiResponse.avatar_url,
    url: apiResponse.url,
    html_url: apiResponse.html_url,
    followers_url: apiResponse.followers_url,
    following_url: apiResponse.following_url,
    gists_url: apiResponse.gists_url,
    starred_url: apiResponse.starred_url,
    subscriptions_url: apiResponse.subscriptions_url,
    organizations_url: apiResponse.organizations_url,
    repos_url: apiResponse.repos_url,
    events_url: apiResponse.events_url,
    received_events_url: apiResponse.received_events_url,
    type: apiResponse.type,
    site_admin: apiResponse.site_admin,
    name: apiResponse.name,
    company: apiResponse.company,
    blog: apiResponse.blog,
    location: apiResponse.location,
    email: apiResponse.email,
    hireable: apiResponse.hireable,
    bio: apiResponse.bio,
    twitter_username: apiResponse.twitter_username,
    public_repos: apiResponse.public_repos,
    public_gists: apiResponse.public_gists,
    followers: apiResponse.followers,
    following: apiResponse.following,
    registration_date: new Date(apiResponse.created_at),
  };
};

export class Cron {
  public start() {
    scheduleJob("* * * * *", async () => {
      try {
        // Assuming we will start from 1
        let nextId = 1;

        // If we already have some users, get the latest inserted ID from the database
        const latestId = await db
          .select({ latestId: max(githubUsers.githubId) })
          .from(githubUsers);
        if (Array.isArray(latestId) && latestId.length > 0) {
          // change the next id accordingly
          nextId = (latestId[0]?.latestId ?? 0) + 1;
        }
        // Get the count of failed fetches, so we do not fetch again
        // we should not count all. However, only those that are greater than or equal the nextId
        const failedFetches = await db
          .select({ value: count(notFound.id) })
          .from(notFound)
          .where(gte(notFound.githubId, nextId));
        if (Array.isArray(failedFetches) && failedFetches.length > 0) {
          nextId += failedFetches[0]?.value ?? 0;
        }
        const result = await fetch(`https://api.github.com/user/${nextId}`);
        const data = (await result.json()) as
          | OriginalGithubUserRow
          | GithubError;
        // If the data is an error, we will store that id in the notFound table
        if ((data as GithubError)?.message) {
          await db.insert(notFound).values({ githubId: nextId }).execute();
          return;
        }
        // Otherwise, we will insert the data into the githubUsers table
        await db
          .insert(githubUsers)
          .values(modifyGithubResponse(data as OriginalGithubUserRow))
          .execute();
      } catch (error) {
        console.error("Cron job failed", error);
      }
    });
  }
}
