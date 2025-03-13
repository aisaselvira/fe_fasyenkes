import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/atoms/accordion";

interface QAAccordionItemProps {
    question: string;
    answer: string;
    value: string;
}

export function QAAccordionItem({question, answer, value}: QAAccordionItemProps) {
    return (
        <AccordionItem value={value} className="mb-4 overflow-hidden rounded-lg">
            <AccordionTrigger className="flex bg-gray-200 px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-300">
                <span className="flex-1">{question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-gray-700">{answer}</AccordionContent>
        </AccordionItem>
    );
}
