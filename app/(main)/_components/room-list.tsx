"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { RoomItem } from "./room-item";
import { Home } from "lucide-react";


export const RoomList = () => {

    const roomIds = useQuery(api.rooms.getRooms);

    if (roomIds == undefined) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <>
            {roomIds &&
                <div className="pl-[12px]">
                    <div className="flex items-center2">
                        <Home className="shrink-0 h-[18px] mr-2"/>
                        <p className="text-sm">Your rooms</p>
                    </div>
                    <div className="w-full">
                        {roomIds?.map((roomId) => (
                            <RoomItem 
                                key={roomId}
                                id={roomId}
                            />
                        ))}
                    </div>
                </div>  
                
            }
        </>
    )
}