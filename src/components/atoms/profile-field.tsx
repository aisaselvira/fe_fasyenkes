interface ProfileFieldProps {
    label: string;
    value: string;
}

export function ProfileField({label, value}: ProfileFieldProps) {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="mt-1 text-base font-medium text-gray-900">{value}</p>
        </div>
    );
}
