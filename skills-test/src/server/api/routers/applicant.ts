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
});
