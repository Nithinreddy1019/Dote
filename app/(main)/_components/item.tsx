"use client"
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, LucideIcon } from "lucide-react";

 


interface ItemProps {
    id?: Id<"documents">,
    documentIcon? :string,
    active? :boolean,
    expanded?: boolean,
    isSearch? : boolean,
    level?: number,
    onExpand?: () => void,
    label: string,
    onClick: () => void,
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

    const ChevronIcon = expanded ? ChevronDown : ChevronLeft;



    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}` : "12px"
            }}
            className={cn(
                "group min-h-[27px] text-sm py-1.5 pr-3 w-full hover:bg-primary flex items-center font-medium",
                active && "bg-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-secondary mr-1"
                    onClick={() => {}} 
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
        </div>
    )
};