interface SectionTitleProps {
    title: string;
    className?: string;
}

export function SectionTitle({title, className = ""}: SectionTitleProps) {
    return <div className={`bg-blue-800 text-white font-semibold py-2 px-4 rounded-t-md ${className}`}>{title}</div>;
}
