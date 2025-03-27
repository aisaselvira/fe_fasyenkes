interface PatientInfoRowProps {
    label: string;
    value: string;
}

export function PatientInfoRow({label, value}: PatientInfoRowProps) {
    return (
        <div className="grid grid-cols-[1fr,3fr] border-b border-r border-gray-300">
            <div className="p-3 font-medium border-l border-gray-300 bg-white/80">{label}</div>
            <div className="p-3 border-l border-gray-300 bg-white/90">{value}</div>
        </div>
    );
}
