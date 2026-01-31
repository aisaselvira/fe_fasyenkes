import { User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface DashboardHeaderProps {
    title?: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        Cookies.remove("token");
        router.push("/login");
    };


    return (
        <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl font-bold">{title || "Dashboard"}</h1>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-2 focus:outline-none"
                    >
                        <User className="h-8 w-8 text-blue-400 bg-blue-100 rounded-full p-1 cursor-pointer" />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
