"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { Box, ChevronDown, ChevronRight, MoreHorizontal, SquareChevronDown, SquareChevronRight, Trash } from "lucide-react"
import { useState } from "react"



interface RoomItemProps {
    id: Id<"rooms">
}

export const RoomItem = ({
    id
}: RoomItemProps) => {

    const { user } = useUser();

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

    const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

    return (
        <div className="group min-h-[27px] text-sm py-1.5 pr-3 w-full hover:bg-primary/25 flex items-center font-medium pl-[12px]">
            <div
                    role="button"
                    className="h-full rounded-sm hover:bg-secondary mr-1"
                    onClick={() => {}} 
                >
                    <ChevronIcon
                        className="h-4 w-4 shrink-0 opacity-50"
                    />
            </div>
            <Box className="shrink-0 h-[18px] mr-2"/>
            <span className="truncate">
                {roomDetails.roomName}
            </span>
            <div className="ml-auto flex items-center gap-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-[5px] hover:bg-secondary">
                            <MoreHorizontal className="w-4 h-4"/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side="right"
                        forceMount
                    >
                        <DropdownMenuItem>
                            <Trash className="w-4 h-4 mr-2"/>
                            Delete room
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="text-xs p-2">
                            Room creator: {roomDetails.creatorName}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}