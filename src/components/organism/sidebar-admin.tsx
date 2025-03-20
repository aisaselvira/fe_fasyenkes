"use client"

import type React from "react"
import { useState, useEffect, type ReactNode } from "react"
import Logo from "../atoms/logo"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { usePathname } from "next/navigation"

interface MenuItem {
    label: string
    href: string
}

const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/admin/dasboard/page" },
    { label: "Kelola Simulasi TPPRJ", href: "/admin/simulasi-tpprj/page" },
    { label: "Kelola Simulasi TPPRI", href: "/admin/simulasi-tppri/page" },
    { label: "Kelola Simulasi TPPGD", href: "/admin/simulasi-tppgd/page" },
]

interface MenuLinkProps {
    href: string
    children: ReactNode
    isActive: boolean
    setOpen: (open: boolean) => void
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, children, isActive, setOpen }) => (
    <Link
        href={href}
        className={`block w-full py-3 px-6 font-medium transition-colors ${isActive ? "bg-gray-200 text-[#2E3192]" : "text-white hover:bg-[#3D41A8]"
            }`}
        onClick={() => setOpen(false)}
    >
        {children}
    </Link>
)

export default function Sidebar() {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const pathname = usePathname()

    useEffect(() => {
        if (isDesktop) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [isDesktop])

    return (
        <>
            {/* Tombol Menu untuk Mobile */}
            {!isDesktop && !open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top- left-1 z-50 bg-[#2E3192] text-white p-2 rounded-md md:hidden"
                    aria-label="Toggle menu"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#2E3192] flex flex-col z-40 transform ${open ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <div className="relative h-20 w-full flex justify-center">
                        <Logo />
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1">
                    <ul className="w-full">
                        {menuItems.map((item) => (
                            <li key={item.href} className="w-full">
                                <MenuLink href={item.href} isActive={pathname === item.href} setOpen={setOpen}>
                                    {item.label}
                                </MenuLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Overlay untuk menutup sidebar di layar kecil */}
            {!isDesktop && open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setOpen(false)} />
            )}
        </>
    )
}

