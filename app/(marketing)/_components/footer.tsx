import { Button } from "@/components/ui/button";
import { Logo } from "./logo";



export const Footer = () => {
    return (
        <div className="flex items-center p-6 z-50 bg-background w-full">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost">
                    About
                </Button>
            </div>
        </div>
    );
}