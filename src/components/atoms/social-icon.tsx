import type {LucideIcon} from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function SocialIcon({href, icon: Icon, label}: SocialIconProps) {
    return (
        <Link href={href} className="text-white transition-opacity hover:opacity-80" aria-label={label}>
            <Icon className="h-7 w-7" />
        </Link>
    );
}
