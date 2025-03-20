import {Check} from "lucide-react";

export function CaseCheckbox() {
    return (
        <div className="w-6 h-6 border border-red-500 rounded flex items-center justify-center">
            <Check className="h-4 w-4 text-red-500" />
        </div>
    );
}
