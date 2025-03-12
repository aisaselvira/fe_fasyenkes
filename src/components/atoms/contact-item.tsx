import type React from "react";
import type {LucideIcon} from "lucide-react";

interface ContactItemProps {
    icon: LucideIcon;
    children: React.ReactNode;
}

export function ContactItem({icon: Icon, children}: ContactItemProps) {
    return (
        <div className="flex items-center gap-2 text-white">
            <Icon className="h-4 w-4 shrink-0" />
            <span className="text-sm">{children}</span>
        </div>
    );
}
