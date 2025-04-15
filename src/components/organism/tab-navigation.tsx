"use client";

import {cn} from "@/lib/utils";

interface TabNavigationProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function TabNavigation({tabs, activeTab, onTabChange}: TabNavigationProps) {
    return (
        <div className="grid grid-cols-3 rounded-t-lg">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab.toLowerCase())}
                    className={cn(
                        "py-3 text-lg font-bold",
                        activeTab === tab.toLowerCase() ? "bg-primary text-white" : "bg-white"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
