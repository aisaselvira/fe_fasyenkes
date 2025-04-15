import { useEffect, useRef } from "react";
import { User } from "lucide-react";
import Sidebar from "../../organism/sidebar-admin";
import Chart from "chart.js/auto";

const weeklyActiveUsers = [
    { day: "Senin", activeUsers: 20, color: "#8da9f1" },
    { day: "Selasa", activeUsers: 40, color: "#f4978e" },
    { day: "Rabu", activeUsers: 34, color: "#76c7c0" },
    { day: "Kamis", activeUsers: 35, color: "#f4a261" },
    { day: "Jum'at", activeUsers: 20, color: "#4d88ff" },
    { day: "Sabtu", activeUsers: 22, color: "#90be6d" },
    { day: "Minggu", activeUsers: 33, color: "#a78bfa" },
];

export default function Dashboard() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        const labels = weeklyActiveUsers.map((d) => d.day);
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
                <header className="border-b border-gray-200 bg-white shadow-sm">
                    <div className="flex justify-between items-center px-6 py-4">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <User className="h-8 w-8 text-blue-400 bg-blue-100 rounded-full p-1" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-3 overflow-auto">
                    <div className="space-y-8">
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
