import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {Label} from "@/components/atoms/label";

interface CaseCompletionTimeProps {
    actualDuration: string;
    idealDuration: string;
    isUnderIdealTime: boolean;
}

export function CaseCompletionTime({actualDuration, idealDuration, isUnderIdealTime}: CaseCompletionTimeProps) {
    return (
        <Card className="bg-indigo-50 border-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-center text-xl font-bold text-gray-800">Waktu Penyelesaian Kasus</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6">
                    <Card className="bg-yellow-300 border-none shadow-md w-full md:w-auto min-w-[200px]">
                        <CardContent className="p-4 text-center">
                            <Label className="text-gray-700 font-medium mb-1 block">Durasi Penyelesaian Kasus :</Label>
                            <p className="text-3xl font-bold text-gray-800">{actualDuration}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-300 border-none shadow-md w-full md:w-auto min-w-[200px]">
                        <CardContent className="p-4 text-center">
                            <Label className="text-gray-700 font-medium mb-1 block">Durasi Ideal :</Label>
                            <p className="text-3xl font-bold text-gray-800">{idealDuration}</p>
                        </CardContent>
                    </Card>
                </div>

                <p className={`text-center font-medium ${isUnderIdealTime ? "text-red-600" : "text-blue-600"}`}>
                    {isUnderIdealTime
                        ? "Selamat! kamu sudah bisa menyelesaikan kasus dibawah durasi ideal!"
                        : "Kamu menyelesaikan kasus melebihi durasi ideal. Terus berlatih ya!"}
                </p>
            </CardContent>
        </Card>
    );
}
