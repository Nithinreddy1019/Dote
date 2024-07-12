import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id("documents")),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
        roomId: v.optional(v.id("rooms"))
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"])
    .index("by_room", ["roomId"]),
    
    rooms: defineTable({
        roomName: v.string(),
        creatorId: v.string(),
        members: v.optional(v.array(v.string())),
        pages: v.optional(v.array(v.id("documents")))
    })
    .index("by_creator", ["creatorId"])
});