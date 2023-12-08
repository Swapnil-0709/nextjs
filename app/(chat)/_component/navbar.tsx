'use client'
import React from 'react';
import {MenuIcon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";


interface NavbarProps {
    isCollapsed: boolean
    onResetWidth: () => void
}

const Navbar = ({isCollapsed, onResetWidth}: NavbarProps) => {

    return (
        <React.Fragment>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon onClick={onResetWidth} role="button" className="h-6 w-6 text-muted-foreground"/>
                )}
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="h-7 w-20 rounded-md "/>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;