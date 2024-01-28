import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sayings: defineTable({
    saying: v.string(),
    fellowId: v.id("fellows"),
    fellowName: v.string(),
    innId: v.id("inns"),
  }),
  fellows: defineTable({
    name: v.string(),
  }),
  inns: defineTable({
    title: v.string(),
  }),
});
