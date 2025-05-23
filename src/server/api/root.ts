import { createTRPCRouter } from "~/server/api/trpc";
import { gamesRouter } from "./routers/games";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  games: gamesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
