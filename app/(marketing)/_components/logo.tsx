import Image from "next/image";

import { cn } from "@/lib/utils";


export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image 
                src="/logo.svg"
                alt="logo"
                height={30}
                width={30}
                className="dark:hidden"
            />
            <Image 
                src="/logo-dark.svg"
                alt="logo"
                height={30}
                width={30}
                className="hidden dark:block"
            />
            <p className={cn("font-semibold")}>
                Dote
            </p>
        </div>
    );
}