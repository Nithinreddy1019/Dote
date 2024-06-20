"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Plans, Ideas and Notes. All at one place. <span className="underline">Dote</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Workspace where better, productive <br /> & faster work happens.
            </h3>
            <Button>
                Go to Dote
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    )
};