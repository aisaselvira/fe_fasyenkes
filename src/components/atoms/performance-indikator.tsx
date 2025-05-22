import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {Progress} from "@/components/atoms/progress";

interface PerformanceIndicatorProps {
    title: string;
    indicators: {
        name: string;
        value: number;
    }[];
}

export function PerformanceIndicator({title, indicators}: PerformanceIndicatorProps) {
    return (
        <Card className="bg-indigo-50 border-none shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-center text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {indicators.map((indicator) => (
                        <div key={indicator.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">{indicator.name}</span>
                                <span className="font-semibold">{indicator.value}%</span>
                            </div>
                            <Progress
                                value={indicator.value}
                                className="h-2.5 bg-red-100"
                                indicatorClassName="bg-gradient-to-r from-red-600 to-red-400"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
