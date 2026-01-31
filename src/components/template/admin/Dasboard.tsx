import { useEffect, useRef, useState } from "react";
import Sidebar from "../../organism/sidebar-admin";
import Chart from "chart.js/auto";
import DashboardHeader from "../../../components/organism/DashboardHeader";
import axios from "axios";
import Cookies from "js-cookie";

type UserCountData = {
    date: string;
    day_name: string;
    total_login_users: string;
};
const backgroundColors = [
    "#8da9f1", "#f4978e", "#76c7c0", "#f4a261",
    "#4d88ff", "#90be6d", "#a78bfa",
];
export default function Dashboard() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [userCounts, setUserCounts] = useState<UserCountData[]>([]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = Cookies.get("token");



    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/admin/user/user-count-per-day`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const apiData: UserCountData[] = res.data?.data ?? [];
                const fullDays = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ];
                const mergedData: UserCountData[] = fullDays.map((day) => {
                    const found = apiData.find((item) => item.day_name === day);
                    return {
                        date: found?.date || "",
                        day_name: day,
                        total_login_users: found?.total_login_users || "0",
                    };
                });

                setUserCounts(mergedData);
            } catch (error) {
                console.error("Gagal mengambil data chart:", error);
            }
        };

        fetchChartData();
    }, [API_BASE_URL, token]);

    useEffect(() => {
        if (!chartRef.current || userCounts.length === 0) return;

        const labels = userCounts.map((d) => d.day_name);
        const dataValues = userCounts.map((d) => Number(d.total_login_users));

        const data = {
            labels,
            datasets: [
                {
                    label: "Jumlah Pengguna Aktif",
                    data: dataValues,
                    backgroundColor: backgroundColors.slice(0, userCounts.length),
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
                            suggestedMax: Math.max(...dataValues) + 1,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
            },
        };

        chartInstance.current?.destroy();
        chartInstance.current = new Chart(chartRef.current, config);

        return () => {
            chartInstance.current?.destroy();
        };
    }, [userCounts]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                <DashboardHeader />
                <main className="flex-1 p-3 overflow-auto">
                    <div>
                        <div className="p-4 rounded-lg flex flex-col items-center">
                            <div className="mb-4 flex items-center justify-center w-full">
                                <h2 className="text-lg font-semibold text-center">
                                    Jumlah Pengguna Aktif per Hari
                                </h2>
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
                                {userCounts.map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <div
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: backgroundColors[idx % backgroundColors.length] }}
                                        />
                                        <span className="text-sm text-gray-600">{item.day_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-gray-200 rounded-lg p-6 w-80 text-center">
                                <p className="text-gray-700 mb-2">Total Akun terdaftar</p>
                                <p className="text-4xl font-bold">30</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
