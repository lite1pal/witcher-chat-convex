import { query } from "./_generated/server";

export const getInn = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("inns")
      .filter((inn) => inn.eq(inn.field("title"), "Seven Cats"))
      .collect();
  },
});
