import type { User } from "@clerk/backend/dist/types/api";
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserInfo = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

const gameSchema = z.object({
  id: z.string(),
  authorID: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  status: z.boolean(),
  starRating: z.number(),
  reviewDesc: z.string(),
});

export const gamesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const games = await ctx.prisma.gamesModel.findMany({ take: 100 });

    const users = (
      await clerkClient.users.getUserList({
        userId: games.map((game) => game.authorID),
      })
    ).map(filterUserInfo);

    return games.map((game) => ({
      game,
      author: users.find((user) => user.id === game.authorID),
    }));
  }),

  createGame: publicProcedure.input(gameSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.gamesModel.create({ data: gameSchema.parse(input) });
  }),
});
