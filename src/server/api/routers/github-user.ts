import { createTRPCRouter, publicProcedure } from "../trpc";

export const githubUsersRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    // get the latest inserted user
    return ctx.db.query.githubUsers.findFirst({
      orderBy: (githubUsers, { desc }) => [desc(githubUsers.createdAt)],
    });
  }),
});
