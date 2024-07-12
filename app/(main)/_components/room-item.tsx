"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { SquareChevronDown, SquareChevronRight } from "lucide-react"
import { useState } from "react"



interface RoomItemProps {
    id: Id<"rooms">
}

export const RoomItem = ({
    id
}: RoomItemProps) => {


    const [isExpanded, setIsExpanded] = useState(false);

    const roomDetails = useQuery(api.rooms.getRoomById, {
        id: id
    })

    if(roomDetails === undefined) {
        return (
            <div>
                Loading..
            </div>
        )
    }

    return (
        <div className="group min-h-[27px] text-sm py-1.5 pr-3 w-full hover:bg-primary/25 flex items-center font-medium">
            <div
                role="button"
                className="h-full rounded-sm hover:bg-secondary mr-1"
            >
                {isExpanded ? (
                    <SquareChevronDown className="h-4 w-4 shrink-0 opacity-50"/>
                ) : (
                    <SquareChevronRight className="h-4 w-4 shrink-0 opacity-50"/>
                )}
            </div>
            <p>
                {roomDetails.name}
            </p>
        </div>
    )
}