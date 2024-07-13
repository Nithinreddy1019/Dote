"use client"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { RoomItem } from "./room-item";
import { Home, Plus } from "lucide-react";
import { CreateRoomModal } from "@/components/modals/create-room-modal";
import { toast } from "sonner";


export const RoomList = () => {

    const roomIds = useQuery(api.rooms.getRooms);
    const createRoom = useMutation(api.rooms.createRoom);


    const hanldeRoomCreate = (roomName: string) => {
        const promise = createRoom({
            roomName: roomName
        })

        toast.promise(promise, {
            loading: "Creating a room...",
            success: "Room created successfully",
            error: "Failed to create new room"
        })
    }

    if (roomIds == undefined) {
        return (
            <div>
                Loading
            </div>
        )
    }

    if (roomIds ===  null) {
        return null
    }

    return (
        <>
            {roomIds &&
                <div className="group min-h-[27px] text-sm py-1.5 pr-3 w-full bg-primary/25 flex items-center font-medium pl-[12px] border-primary">
                    <Home className="mr-2 shrink-0 h-[18px]"/>
                    <span className="truncate">
                        Your rooms
                    </span>
                    <div className="ml-auto flex items-center gap-x-2 opacity-0 group-hover:opacity-100 h-full rounded-[5px] hover:bg-secondary">
                        <CreateRoomModal onConfirm={hanldeRoomCreate}>
                            <Plus className="w-4 h-4"/>
                        </CreateRoomModal>
                    </div>
                </div>  
                
            }
            {roomIds.length === 0 && (
                <div className="text-sm pl-[12px]">
                    No rooms created
                </div>
            )}
            {roomIds && 
                roomIds.map(room => (
                    <RoomItem id={room}/>
                ))
            }
        </>
    )
}