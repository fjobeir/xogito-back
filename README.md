# Devotion Take Home - Backend

## Tech Stack

Here are all the frameworks used in this repo with links to documentation if you need more information.

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Commands

- `cp .env.example .env` — Creates a new `.env` file.
- `./start-database.sh` — Starts a local PostgreSQL database.
- `npm run db:generate` — Generates a new database migration.
- `npm run db:migrate` — Migrates the database schema.
- `npm run db:studio` — Opens the database studio.
- `npm run dev` — Starts the development server.

## Instructions

This is a simple NextJS application. It currently allows you to create a new post and view the latest post created. This code exists to help show you how to use tRPC.

Your goal is to turn this into an application that scrapes GitHub users.

1. View the GitHub API: https://api.github.com/user/1
2. Create a new database table with a column for each relevant piece of data returned by the API. Please do not store irrelevant data.
3. Create a cron job that downloads one new user every minute. There's a `Cron` class in `src/lib/Cron.ts` that you can use to help you.
4. Create a new tRPC router for GitHub users.
5. Create a new tRPC procedure which returns the latest user.
6. Update the homepage to display the latest user.

## Submission

Please make sure your code is formatted using prettier and eslint.

Please run `./zip-it.sh` to create a zip file containing your submission.
