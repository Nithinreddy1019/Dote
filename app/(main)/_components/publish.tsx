"use client"

import { Doc } from "@/convex/_generated/dataModel";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, Copy, Globe } from "lucide-react";


interface PublishProps {
    initialData: Doc<"documents">
}

export const Publish = ({
    initialData
}: PublishProps) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: " Page published ",
            error: "Failed to publish"
        })
    }

    const onUnPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Un-Publishing...",
            success: " Page Unpublished ",
            error: "Failed to Unpublish"
        })
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                    Publish
                    {initialData.isPublished && (
                        <Globe 
                            className="text-sky-500 h-4 w-4 ml-2"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-72" 
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4"/>
                            <p className="text-xs font-medium text-sky-500">
                                This page is live
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                disabled
                                value={url}
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 truncate focus:outline-0"
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <CheckCheckIcon className="h-4 w-4"/>
                                ) : (
                                    <Copy className="h-4 w-4"/>
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onUnPublish}
                        >
                            UnPublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 mb-2"/>
                        <p className="text-sm font-medium mb-2">
                            Publish this page
                        </p>
                        <span className="text-xs mb-4">
                            Share your page with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}