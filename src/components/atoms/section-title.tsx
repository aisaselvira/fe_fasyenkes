import type {FC, ReactNode} from "react";

interface SectionTitleProps {
    children: ReactNode;
    className?: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({children, className = ""}) => {
    return <h2 className={`font-bold text-center ${className}`}>{children}</h2>;
};
