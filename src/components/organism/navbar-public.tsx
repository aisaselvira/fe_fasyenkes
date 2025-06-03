"use client";

import type React from "react";
import {useState, useEffect, type ReactNode} from "react";
import {usePathname} from "next/navigation";
import {Menu} from "lucide-react";
import Logo from "../atoms/logo";
import UserIcon from "../atoms/user-icon";
import {Button} from "@/components/atoms/button";
import {Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle} from "@/components/atoms/sheet";
import {useMediaQuery} from "@/hooks/use-media-query";
import Link from "next/link";
import {VisuallyHidden} from "@/components/atoms/visually-hidden";

interface MenuItem {
    label: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {label: "Home", href: "/user/home-page"},
    {label: "Simulation", href: "/user/simulation/case-list"},
    {label: "My Result", href: "/user/my-results"},
    {label: "Profile", href: "/user/profile"},
    {label: "Login", href: "/login"},
];

interface MenuLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    setOpen: (open: boolean) => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({href, children, className = "", setOpen}) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/user/home-page" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`px-3 py-2 rounded transition duration-200 ease-in-out ${
                isActive ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"
            } ${className}`}
            onClick={() => setOpen(false)}
        >
            {children}
        </Link>
    );
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (isDesktop) {
            setOpen(false);
        }
    }, [isDesktop]);

    return (
        <header className="w-full bg-blue-800 py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Logo />

                {isDesktop ? (
                    <div className="flex items-center space-x-6">
                        <nav className="flex space-x-6">
                            {menuItems.map((item) => (
                                <MenuLink
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-2 rounded"
                                    setOpen={setOpen}
                                >
                                    {item.label}
                                </MenuLink>
                            ))}
                        </nav>
                        <UserIcon />
                    </div>
                ) : (
                    <div className="flex items-center">
                        <UserIcon />
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-2 hover:bg-transparent">
                                    <Menu className="h-6 w-6 text-white hover:text-primary transition-colors duration-200" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-blue-800 text-white w-64 sm:w-80 p-0">
                                <SheetHeader className="p-6 border-b border-blue-700">
                                    <VisuallyHidden>
                                        <SheetTitle>Navigation Menu</SheetTitle>
                                    </VisuallyHidden>
                                    <Logo />
                                </SheetHeader>
                                <nav className="flex flex-col mt-6">
                                    {menuItems.map((item) => (
                                        <MenuLink
                                            key={item.href}
                                            href={item.href}
                                            className="px-6 py-3 hover:bg-blue-700"
                                            setOpen={setOpen}
                                        >
                                            {item.label}
                                        </MenuLink>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}
            </div>
        </header>
    );
}
