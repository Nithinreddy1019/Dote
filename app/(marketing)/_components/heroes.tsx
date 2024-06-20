import Image from "next/image";



export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center gap-x-12">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] ">
                    <Image
                        src="/documents.svg"
                        fill
                        alt="Documents"
                        className="object-contain"
                    />
                </div>
                <div className="relative w-[350px] h-[350px] hidden md:block">
                    <Image
                        src="/notes.svg"
                        fill
                        alt="Documents"
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}