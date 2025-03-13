import type {FC} from "react";
import {Card, CardContent} from "@/components/atoms/card";
import {CardIcon} from "../atoms/card-icon";

interface FeatureCardProps {
    iconSrc: string;
    iconAlt: string;
    text: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({iconSrc, iconAlt, text}) => {
    return (
        <Card
            className="transform rounded-[70px] shadow-lg transition-transform hover:scale-105 
                    w-full max-w-[250px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[320px]"
        >
            <CardContent className="flex h-full flex-col items-center justify-between p-4 sm:p-5 md:p-6">
                <CardIcon src={iconSrc} alt={iconAlt} />
                <p className="text-center text-xs sm:text-sm text-custom-text-secondary">{text}</p>
            </CardContent>
        </Card>
    );
};
