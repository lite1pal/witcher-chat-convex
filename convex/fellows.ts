import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("fellows").collect();
  },
});

export const pickFellow = mutation({
  args: { fellowId: v.id("fellows") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.fellowId, { picked: true });
  },
});

export const unpickFellow = mutation({
  args: { fellowId: v.id("fellows") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.fellowId, { picked: false });
  },
});
