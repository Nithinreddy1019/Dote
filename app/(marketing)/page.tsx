import { Button } from "@/components/ui/button"
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";


const Marketing = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex-1 flex flex-col gap-y-8 items-center justify-center md:justify-start text-center px-6 pb-10">
                <Heading />
                <Heroes />
            </div>
            <Footer />            
        </div>
    );
}


export default Marketing;