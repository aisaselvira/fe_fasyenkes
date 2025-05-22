import { useEffect, useRef } from "react";
import Sidebar from "../../organism/sidebar-admin";
import Chart from "chart.js/auto";
import DashboardHeader from "../../../components/organism/DashboardHeader";

const weeklyActiveUsers = [
    { activeUsers: 20, color: "#8da9f1" },
    { activeUsers: 40, color: "#f4978e" },
    { activeUsers: 34, color: "#76c7c0" },
    { activeUsers: 35, color: "#f4a261" },
    { activeUsers: 20, color: "#4d88ff" },
    { activeUsers: 22, color: "#90be6d" },
    { activeUsers: 33, color: "#a78bfa" },
];

export default function Dashboard() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        const labels = weeklyActiveUsers.map(() => "");
        const data = {
            labels,
            datasets: [
                {
                    label: "Jumlah Pengguna Aktif",
                    data: weeklyActiveUsers.map((d) => d.activeUsers),
                    backgroundColor: weeklyActiveUsers.map((d) => d.color),
                },
            ],
        };

        const config = {
            type: "bar" as const,
            data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5,
                        },
                    },
                },
            },
        };

        if (chartRef.current) {
            chartInstance.current?.destroy();
            chartInstance.current = new Chart(chartRef.current, config);
        }

        return () => {
            chartInstance.current?.destroy();
        };
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                <DashboardHeader />
                <main className="flex-1 p-3 overflow-auto">
                    <div className="">
                        <div className=" p-4 rounded-lg flex flex-col items-center">
                            <div className="mb-4 flex items-center justify-center w-full">
                                <h2 className="text-lg font-semibold text-center">Jumlah Pengguna Aktif per Hari</h2>
                            </div>
                            <div className="h-80 flex justify-center items-center">
                                <div className="w-[700px]">
                                    <canvas ref={chartRef} className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <p className="text-gray-700 font-medium mb-1">
                                Jumlah Pengguna Aktif
                            </p>

                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    { label: "Senin", color: "bg-blue-400" },
                                    { label: "Selasa", color: "bg-red-300" },
                                    { label: "Rabu", color: "bg-cyan-400" },
                                    { label: "Kamis", color: "bg-orange-300" },
                                    { label: "Jum'at", color: "bg-blue-500" },
                                    { label: "Sabtu", color: "bg-green-400" },
                                    { label: "Minggu", color: "bg-purple-500" },
                                ].map((day, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <div className={`w-4 h-4 rounded ${day.color}`} />
                                        <span className="text-sm text-gray-600">{day.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-gray-200 rounded-lg p-6 w-80 text-center">
                                <p className="text-gray-700 mb-2">Total Akun terdaftar</p>
                                <p className="text-4xl font-bold">12.567</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
