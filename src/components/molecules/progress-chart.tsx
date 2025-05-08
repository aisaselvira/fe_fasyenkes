"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "@/components/atoms/chart";
import patientData from "@/lib/patient-data-user";

interface ProgressChartsProps {
    // Optional props to override the default values
    completedPercentage?: number;
    chartPosition?: {
        cx: string | number;
        cy: string | number;
    };
}

export function ProgressCharts({
    completedPercentage = 60, // Default to 60% completed
    chartPosition = {cx: "50%", cy: "50%"},
}: ProgressChartsProps) {
    // Calculate total cases
    const totalTPPRJ = patientData.tpprj.length;
    const totalTPPGD = patientData.tppgd.length;
    const totalTPPRI = patientData.tppri.length;
    const totalCases = totalTPPRJ + totalTPPGD + totalTPPRI;

    // Calculate completed cases based on percentage
    const completedCases = Math.round((completedPercentage / 100) * totalCases);

    // Calculate individual category completions proportionally
    const completedTPPRJ = Math.min(Math.round((completedPercentage / 100) * totalTPPRJ), totalTPPRJ);
    const completedTPPGD = Math.min(Math.round((completedPercentage / 100) * totalTPPGD), totalTPPGD);
    const completedTPPRI = Math.min(Math.round((completedPercentage / 100) * totalTPPRI), totalTPPRI);

    // Data for pie chart
    const pieChartData = [
        {
            name: "Belum dikerjakan",
            value: totalCases - completedCases,
            color: "#EF4444",
            percentage: 100 - completedPercentage,
        },
        {
            name: "Sudah dikerjakan",
            value: completedCases,
            color: "#F97316",
            percentage: completedPercentage,
        },
    ];

    // Data for bar chart
    const barChartData = [
        {
            name: "TPPRJ",
            completed: completedTPPRJ,
            total: totalTPPRJ,
            color: "#EF4444",
            percentage: (completedTPPRJ / totalTPPRJ) * 100,
        },
        {
            name: "TPPGD",
            completed: completedTPPGD,
            total: totalTPPGD,
            color: "#F97316",
            percentage: (completedTPPGD / totalTPPGD) * 100,
        },
        {
            name: "TPPRI",
            completed: completedTPPRI,
            total: totalTPPRI,
            color: "#F59E0B",
            percentage: (completedTPPRI / totalTPPRI) * 100,
        },
    ];

    // Custom label for pie chart
    interface PieChartLabelProps {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
    }

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}: PieChartLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
        const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card className="shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Progress Pengerjaan Kasus</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx={chartPosition.cx}
                                    cy={chartPosition.cy}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}`, "Jumlah Kasus"]} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 w-full">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                                <span className="text-sm">Belum dikerjakan</span>
                            </div>
                            <span className="text-sm font-medium">
                                {pieChartData[0].value} / {totalCases} ({pieChartData[0].percentage.toFixed(1)}%)
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
                                <span className="text-sm">Sudah dikerjakan</span>
                            </div>
                            <span className="text-sm font-medium">
                                {pieChartData[1].value} / {totalCases} ({pieChartData[1].percentage.toFixed(1)}%)
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Progress Per Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barChartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed" name="Selesai" fill="#F97316" />
                                <Bar dataKey="total" name="Total" fill="#CBD5E1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {barChartData.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <span
                                        className="h-3 w-3 rounded-full mr-2"
                                        style={{backgroundColor: item.color}}
                                    ></span>
                                    {index === 0 && <span className="text-sm">Tempat Pendaftaran Rawat Jalan</span>}
                                    {index === 1 && <span className="text-sm">Tempat Pendaftaran Gawat Darurat</span>}
                                    {index === 2 && <span className="text-sm">Tempat Pendaftaran Rawat Inap</span>}
                                </div>
                                <span className="text-sm font-medium">
                                    {item.completed}/{item.total} ({item.percentage.toFixed(1)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
