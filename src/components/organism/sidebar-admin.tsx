"use client";

import type React from "react";
import { useState, type ReactNode } from "react";
import Logo from "../atoms/logo";
import Link from "next/link";
import { Ambulance, Bed, LayoutDashboard, Stethoscope } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";

interface MenuItem {
    label: string;
    href: string;
    icon: ReactNode;
}

const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Kelola Simulasi TPPRJ", href: "/admin/simulasi-tpprj", icon: <Stethoscope size={20} /> },
    { label: "Kelola Simulasi TPPRI", href: "/admin/simulasi-tppri", icon: <Bed size={20} /> },
    { label: "Kelola Simulasi TPPGD", href: "/admin/simulasi-tppgd", icon: <Ambulance size={20} /> },
];

interface MenuLinkProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
    isActive: boolean;
    isCollapsed: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, icon, children, isActive, isCollapsed }) => (
    <Link
        href={href}
        className={`flex ${isCollapsed ? "justify-center" : "items-center"
            } py-3 px-4 font-medium transition-colors rounded-md my-1 mx-2 ${isActive ? "bg-gray-200 text-[#2E3192]" : "text-white hover:bg-[#3D41A8]"
            }`}
    >
        <span className={isCollapsed ? "" : "mr-3"}>{icon}</span>
        {!isCollapsed && <span>{children}</span>}
    </Link>
);

export default function Sidebar() {
    const [collapsed] = useState(false);
    const isMobile = useMediaQuery("(max-width: 767px)");
    const pathname = usePathname();

    const isCollapsed = isMobile || collapsed;
    const sidebarWidth = isCollapsed ? "w-16" : "w-64";

    return (
        <aside
            className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-[#2E3192] flex flex-col z-40 transition-all duration-300 ease-in-out`}
        >
            {/* Header with Logo */}
            <div className="flex items-center justify-center h-20 relative">
                <div className={`${isCollapsed ? "w-8 h-8" : "w-full"} flex justify-center`}>
                    <Logo />
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto mt-4">
                <ul className="w-full flex flex-col items-center">
                    {menuItems.map((item) => (
                        <li key={item.href} className="w-full">
                            <MenuLink
                                href={item.href}
                                icon={item.icon}
                                isActive={pathname?.startsWith(item.href) ?? false}
                                isCollapsed={isCollapsed}
                            >
                                {item.label}
                            </MenuLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
