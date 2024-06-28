"use client"
import { 
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

 


interface ItemProps {
    id?: Id<"documents">,
    documentIcon? :string,
    active? :boolean,
    expanded?: boolean,
    isSearch? : boolean,
    level?: number,
    onExpand?: () => void,
    label: string,
    onClick?: () => void,
    icon: LucideIcon
};

export const Item = ({
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    label, 
    onClick, 
    icon: Icon
}: ItemProps) => {

    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        
        if(!id) return;

        const promise = archive({id});

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Moved to trash",
            error: "Failed to move to trash"
        })
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        onExpand?.();
    }
    
    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if(!id) return;

        const promise = create({ title: "Untitled", parentDocument: id}).then((documentId) => {
            if(!expanded) {
                onExpand?.()
            }
            //router.push(`/documents/${documentId}`)
        });

        toast.promise(promise, {
            loading: "Creating a new page...",
            success:"Created new page",
            error: "Failed to create new page"
        })

    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                "group min-h-[27px] text-sm py-1.5 pr-3 w-full hover:bg-primary/25 flex items-center font-medium",
                active && "bg-primary text-white hover:bg-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-secondary mr-1"
                    onClick={handleExpand} 
                >
                    <ChevronIcon 
                        className="h-4 w-4 shrink-0 opacity-50"
                    />
                </div>
            )}
            {documentIcon ? 
                (
                    <div className="mr-2 shrink-0 text-[18px]">
                        {documentIcon}
                    </div>
                ) : 
                (
                    <Icon  className="shrink-0 h-[18px] mr-2"/>
                )
            }
            
            <span className=" truncate">
                {label}
            </span>
            {
                isSearch && (
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                        <span>ctrl +</span>k
                    </kbd>
                )
            }
            {
                !!id && (
                    <div className="ml-auto flex items-center gap-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    role="button"
                                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-[5px] hover:bg-secondary hover:text-neutral-600"
                                >
                                    <MoreHorizontal className="w-4 h-4"/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-60"
                                align="start"
                                side="right"
                                forceMount
                            >
                                <DropdownMenuItem onClick={onArchive}>
                                   <Trash2 className="w-4 h-4 mr-2"/>
                                   Delete 
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className="text-xs p-2">
                                    Last edited by: {user?.fullName}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div 
                            role="button"
                            onClick={onCreate}
                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-[5px] hover:bg-secondary">
                            <Plus className="h-4 w-4 text-muted-foreground"/>
                        </div>
                    </div>
                )
            }
        </div>
    )
};



Item.Skeleton = function ItemSkeleton({ level }: { level?: number}) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}