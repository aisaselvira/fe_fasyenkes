"use client";

interface DebugInfoProps {
    currentComponentIndex: number;
    formType: string;
    isVisible?: boolean;
}

export function DebugInfo({currentComponentIndex, formType, isVisible = true}: DebugInfoProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-xs z-50 rounded-tl-md">
            <div>Component Index: {currentComponentIndex}</div>
            <div>Form Type: {formType}</div>
        </div>
    );
}
