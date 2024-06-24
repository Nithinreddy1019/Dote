"use client"

import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();

    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({
            title: "Untitled"
        });

        toast.promise(promise, {
            loading: "Creating new page",
            success: "New page created",
            error: "Failed to create new page"
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src={"/createnote.svg"}
                height={350}
                width={350}
                alt="create note"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Dote
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a page
            </Button>
        </div>
    );
}


export default DocumentsPage;