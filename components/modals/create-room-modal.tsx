"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { useState } from "react";


interface CreateRoomModalProps {
    children: React.ReactNode,
    onConfirm: (roomName: string) => void
}

export const CreateRoomModal = ({
    children,
    onConfirm
}: CreateRoomModalProps) => {

    const [roomName, setRoomName] = useState("");

    const hanldeCreate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        onConfirm(roomName);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Create new room
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter your room name
                    </AlertDialogDescription>
                    <Input 
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={hanldeCreate}>
                        Create
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}