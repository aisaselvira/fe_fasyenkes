interface PatientDetailRowProps {
    label: string;
    value: string;
}

export function PatientDetailRow({label, value}: PatientDetailRowProps) {
    return (
        <tr className="border-b border-gray-200">
            <td className="p-3 font-medium border-r border-gray-200 w-36">{label}</td>
            <td className="p-3">{value}</td>
        </tr>
    );
}
