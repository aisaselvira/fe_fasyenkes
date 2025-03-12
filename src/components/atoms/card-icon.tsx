import type {FC} from "react";
import Image from "next/image";

interface CardIconProps {
    src: string;
    alt: string;
}

export const CardIcon: FC<CardIconProps> = ({src, alt}) => {
    return (
        <div className="relative h-36 w-36 lg:h-38 lg:w-38 mx-auto mb-4">
            <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-contain" />
        </div>
    );
};
