import Image from "next/image";

interface ClickableImageProps {
    src: string;
    alt: string;
    onClick: () => void;
    width?: number;
    height?: number;
}

export function ClickableImage({src, alt, onClick, width = 400, height = 600}: ClickableImageProps) {
    return (
        <div
            className="relative overflow-hidden rounded-md border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors"
            onClick={onClick}
        >
            <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={width}
                height={height}
                className="object-contain w-full"
            />
        </div>
    );
}
