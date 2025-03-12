import type {FC, ReactNode} from "react";

interface SectionTitleProps {
    children: ReactNode;
    className?: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({children, className = ""}) => {
    return <h2 className={`text-2xl md:text-3xl font-bold text-center ${className}`}>{children}</h2>;
};
