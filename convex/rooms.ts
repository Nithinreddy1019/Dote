import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const createRoom = mutation({
    args: {roomName: v.string()},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const existingRoomName = await ctx.db.query("rooms")
            .filter((q) => q.eq(q.field("roomName"), args.roomName))
            .collect()

        if (existingRoomName.length > 0) {
            throw new Error("Room with same name exists")
        }

        const room = await ctx.db.insert("rooms", {
            roomName: args.roomName,
            creatorId: userId,
            members: [userId]
        });

        return room;
    }
});


export const getRooms = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject;

        const rooms = await ctx.db.query("rooms").collect();

        const roomsList = rooms.filter(room => {
            return room.members?.find(member => member === userId)
        })

        const roomIds = []
        for (const room of roomsList) {
            roomIds.push(room._id)
        };

        return roomIds;
    }
});


export const getRoomById = query({
    args: { id: v.id("rooms") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject;

        const room = await ctx.db.get(args.id);

        if(!room) {
            throw new Error("Room does not exists")
        }

        const userInRoom = room?.members?.find((userId) => userId === userId);

        if(!userInRoom) {
            throw new Error("Unauthorized")
        }

        return ({
            id: room._id,
            name: room.roomName
        })
    }
})