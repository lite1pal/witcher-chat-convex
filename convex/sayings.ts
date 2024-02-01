import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByInnId = query({
  args: { innId: v.id("inns") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sayings")
      .filter((saying) => saying.eq(saying.field("innId"), args.innId))
      .collect();
  },
});

export const createSaying = mutation({
  args: {
    saying: v.string(),
    innId: v.id("inns"),
    fellowId: v.id("fellows"),
    fellowName: v.string(),
    fellowImg: v.string(),
  },
  handler: async (ctx, args) => {
    const { saying, innId, fellowId, fellowName, fellowImg } = args;
    const sayingId = await ctx.db.insert("sayings", {
      saying,
      innId,
      fellowId,
      fellowName,
      fellowImg,
    });
    return sayingId;
  },
});
