"use client";
import {ProgressCharts} from "@/components/molecules/progress-chart";
import {CaseSearchSection} from "@/components/molecules/case-search-section";

export function MyResultsTemplate() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900">Hasil Simulasi Saya</h1>

                        {/* Progress Charts */}
                        <ProgressCharts completedPercentage={60} />

                        {/* Case Search Section */}
                        <CaseSearchSection />
                    </div>
                </div>
            </main>
        </div>
    );
}
