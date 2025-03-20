import { User } from "lucide-react"
import { Settings } from "lucide-react"
import Sidebar from "../../organism/sidebar-admin";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const dailyVisitsData = [
    { day: 1, existingUsers: 80, newUsers: 95 },
    { day: 2, existingUsers: 110, newUsers: 70 },
    { day: 3, existingUsers: 165, newUsers: 40 },
    { day: 4, existingUsers: 120, newUsers: 60 },
    { day: 5, existingUsers: 70, newUsers: 110 },
    { day: 6, existingUsers: 95, newUsers: 150 },
    { day: 7, existingUsers: 20, newUsers: 120 },
    { day: 8, existingUsers: 60, newUsers: 70 },
    { day: 9, existingUsers: 140, newUsers: 40 },
]
export default function Dasboard() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen md:ml-64">
                    <header className="border-b border-gray-200 bg-white shadow-sm">
                        <div className="flex justify-between items-center px-6 py-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <div className="flex items-center space-x-4">
                                <User className="h-8 w-8 text-blue-400 bg-blue-100 rounded-full p-1" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-3 bg-white overflow-auto">
                        <div className="space-y-8">
                            {/* Daily visits chart */}
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Kunjungan Harian Pengguna</h2>
                                    <button className="p-1 rounded hover:bg-gray-100">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={dailyVisitsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="existingUsers"
                                                name="Pengguna lama"
                                                stroke="#FF4D4F"
                                                strokeWidth={2}
                                                activeDot={{ r: 8 }}
                                                fill="url(#colorExisting)"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="newUsers"
                                                name="Pengguna baru"
                                                stroke="#FFAA33"
                                                strokeWidth={2}
                                                activeDot={{ r: 8 }}
                                                fill="url(#colorNew)"
                                            />
                                            <defs>
                                                <linearGradient id="colorExisting" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#FF4D4F" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#FF4D4F" stopOpacity={0.1} />
                                                </linearGradient>
                                                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#FFAA33" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#FFAA33" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center mt-4 space-x-8">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full bg-[#FF4D4F] mr-2"></span>
                                        <span>Pengguna lama</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full bg-[#FFAA33] mr-2"></span>
                                        <span>Pengguna baru</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats card */}
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
        </>
    )
}