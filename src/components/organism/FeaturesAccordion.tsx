import {Accordion} from "@/components/atoms/accordion";
import {FeatureItem} from "@/components/molecules/FeatureItem";

interface Feature {
    id: string;
    title: string;
    description: string;
    subDescription?: string;
    imageSrc: string;
    imagePosition?: "left" | "right";
}

interface FeaturesAccordionProps {
    heading: string;
    features: Feature[];
}

export const FeaturesAccordion = ({heading, features}: FeaturesAccordionProps) => {
    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{heading}</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={feature.id}
                            // value={feature.id}
                            title={feature.title}
                            description={feature.description}
                            subDescription={feature.subDescription}
                            imageSrc={feature.imageSrc}
                            imagePosition={index % 2 === 0 ? "right" : "left"}
                        />
                    ))}
                </Accordion>
            </div>
        </section>
    );
};
