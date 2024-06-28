"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface BannerProps {
    documentId: Id<"documents">
}



export const Banner = ({
    documentId
}: BannerProps) => {

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting page...",
            success: "Page is deleted",
            error: "Failed to delete the page"
        });

        router.push("/documents");
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring the page...",
            success: "Succeaafully restored the page",
            error: "Failed to restore the page"
        });
    }

    return (
        <div className="w-full bg-primary text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is in the Trash.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent p-1 px-2 font-normal h-auto"
            >
                Restore Page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent p-1 px-2 font-normal h-auto"
                >
                    Delete permanently
                </Button>
            </ConfirmModal>
        </div>
    )
}