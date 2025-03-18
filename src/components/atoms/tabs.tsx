"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

function useTabs() {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs component");
    }
    return context;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
}

export function Tabs({value, onValueChange, children, className, ...props}: TabsProps) {
    return (
        <TabsContext.Provider value={{value, onValueChange}}>
            <div className={cn("w-full", className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function TabsList({children, className, ...props}: TabsListProps) {
    return (
        <div role="tablist" className={cn("flex", className)} {...props}>
            {children}
        </div>
    );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    children: React.ReactNode;
}

export function TabsTrigger({value, children, className, ...props}: TabsTriggerProps) {
    const {value: selectedValue, onValueChange} = useTabs();
    const isSelected = selectedValue === value;

    return (
        <button
            role="tab"
            aria-selected={isSelected}
            data-state={isSelected ? "active" : "inactive"}
            onClick={() => onValueChange(value)}
            className={cn(className)}
            {...props}
        >
            {children}
        </button>
    );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children: React.ReactNode;
}

export function TabsContent({value, children, className, ...props}: TabsContentProps) {
    const {value: selectedValue} = useTabs();
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
        <div role="tabpanel" data-state={isSelected ? "active" : "inactive"} className={cn(className)} {...props}>
            {children}
        </div>
    );
}
