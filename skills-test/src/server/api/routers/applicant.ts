import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const applicantRouter = createTRPCRouter({
  searchApplicants: publicProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!input.searchTerm || input.searchTerm.trim().length < 2) {
        return await ctx.db.applicant.findMany();
      }

      console.log(input.searchTerm);

      return await ctx.db.applicant.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: input.searchTerm,
              },
            },
            {
              lastName: {
                contains: input.searchTerm,
              },
            },
            {
              driversLicense: {
                contains: input.searchTerm,
              },
            },
          ],
        },
      });
    }),

  getApplicant: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.applicant.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  createNewApplicant: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        dl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.applicant.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          driversLicense: input.dl,
          imageUrl: "",
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        dl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.applicant.update({
        where: {
          id: input.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          driversLicense: input.dl,
          imageUrl: "",
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.applicant.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
