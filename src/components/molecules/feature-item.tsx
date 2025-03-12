import {FeatureImage} from "@/components/atoms/feature-image";

interface FeatureItemProps {
    title: string;
    description: string;
    subDescription?: string;
    imageSrc: string;
    imagePosition?: "left" | "right";
}

export const FeatureItem = ({
    title,
    description,
    subDescription,
    imageSrc,
    imagePosition = "right",
}: FeatureItemProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 py-4 md:py-2">
            {imagePosition === "left" && <FeatureImage src={imageSrc} alt={title} className="md:w-1/2" />}
            <div className={`flex-1 ${imagePosition === "right" ? "md:pr-8" : "md:pl-8"}`}>
                <h3 className="font-semibold text-xl md:text-2xl mb-4">{title}</h3>
                <p className="text-sm md:text-base text-gray-700 mb-2">{description}</p>
                {subDescription && <p className="text-xs md:text-sm text-gray-500">{subDescription}</p>}
            </div>
            {imagePosition === "right" && <FeatureImage src={imageSrc} alt={title} className="md:w-1/2" />}
        </div>
    );
};
