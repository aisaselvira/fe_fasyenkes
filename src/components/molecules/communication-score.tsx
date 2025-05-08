import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {Progress} from "@/components/atoms/progress";

interface CommunicationScoreProps {
    score: number;
    title?: string;
}

export function CommunicationScore({score, title = "Nilai Komunikasi Kumulatif"}: CommunicationScoreProps) {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Pronunciation</span>
                            <span className="font-semibold">{score}%</span>
                        </div>
                        <Progress
                            value={score}
                            className="h-2.5 bg-red-100"
                            indicatorClassName="bg-gradient-to-r from-red-600 to-red-400"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
