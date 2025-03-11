import {FeatureItem} from "@/components/molecules/FeatureItem";

interface Feature {
    id: string;
    title: string;
    description: string;
    subDescription?: string;
    imageSrc: string;
    imagePosition?: "left" | "right";
}

interface FeaturesListProps {
    heading: string;
    features: Feature[];
}

export const FeaturesList = ({heading, features}: FeaturesListProps) => {
    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{heading}</h2>
                <div className="space-y-12 md:space-y-16">
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                            subDescription={feature.subDescription}
                            imageSrc={feature.imageSrc}
                            imagePosition={index % 2 === 0 ? "right" : "left"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
