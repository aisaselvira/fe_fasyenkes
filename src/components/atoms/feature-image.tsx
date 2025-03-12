import Image from "next/image";
import {cn} from "@/lib/utils";

interface FeatureImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const FeatureImage = ({src, alt, className}: FeatureImageProps) => {
    return (
        <div className={cn("relative w-full h-48 md:h-64 lg:h-80", className)}>
            <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-contain" />
        </div>
    );
};
