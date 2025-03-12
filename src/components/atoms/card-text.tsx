import type {FC, ReactNode} from "react";

interface CardTextProps {
    children: ReactNode;
}

export const CardText: FC<CardTextProps> = ({children}) => {
    return <p className="text-center text-sm text-gray-700 px-4">{children}</p>;
};
