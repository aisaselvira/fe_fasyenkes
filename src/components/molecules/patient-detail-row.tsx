interface PatientDetailRowProps {
    label: string;
    value: string;
}

export function PatientDetailRow({label, value}: PatientDetailRowProps) {
    return (
        <tr className="border-b">
            <td className="border-r p-3 bg-gray-50 w-1/3 text-sm sm:text-base">{label}</td>
            <td className="p-3 text-sm sm:text-base">{value}</td>
        </tr>
    );
}
