import Link from "next/link";

interface MenuItemProps {
    label: string;
    href: string;
}

export default function MenuItem({label, href}: MenuItemProps) {
    return (
        <Link href={href} className="text-white hover:text-gray-300 transition">
            {label}
        </Link>
    );
}
