import {SectionTitle} from "../atoms/section-title";
import {AlertCircle} from "lucide-react";

interface ScenarioSectionProps {
    scenario: string;
    isSimulationActive: boolean;
}

export function ScenarioSection({scenario, isSimulationActive}: ScenarioSectionProps) {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <div className="bg-blue-800">
                <SectionTitle className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-t-md">
                    Skenario
                </SectionTitle>
            </div>
            <div className="p-4 min-h-[200px]">
                {isSimulationActive ? (
                    <p className="text-gray-700">{scenario}</p>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-red-500 text-sm">Bagian petunjuk pendaftaran pasien</p>
                        </div>

                        <div className="flex items-start gap-2 mt-8">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-red-500 text-sm">
                                Kamu bisa mengulang dan melanjutkan petunjuk pengerjaan
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
