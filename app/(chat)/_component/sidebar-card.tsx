'use client'

import React, {ElementRef, useEffect, useRef, useState} from 'react';
import {cn} from "@/lib/utils";
import {useMediaQuery} from "usehooks-ts";
import {ChevronsLeft, MenuIcon} from "lucide-react";
import SearchUser from "@/app/(chat)/_component/search-user";
import Navbar from "@/app/(chat)/_component/navbar";
import UserInfo from "@/app/(chat)/_component/user-info";

const SidebarCard = () => {

    const isMobile = useMediaQuery('(max-width:768px)');
    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<'aside'>>(null)
    const navbarRef = useRef<ElementRef<'div'>>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [isMobile]);


    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 350) newWidth = 350;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile ? '100%' : '350px';
            navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 350px)')
            navbarRef.current.style.setProperty('left', isMobile ? '100%' : '350px')
            // for animation
            setTimeout(() => setIsResetting(false), 300)
        }
    }
    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = '0';
            navbarRef.current.style.setProperty('width', '100%');
            navbarRef.current.style.setProperty('left', '0');
            setTimeout(() => setIsResetting(false), 300)
        }
    }
    return (
        <React.Fragment>
            <aside ref={sidebarRef} className={cn(
                "group/sidebar h-full bg-gray-200 overflow-y-auto relative" +
                " flex" +
                " w-60 flex-col z-[100]",
                isResetting && 'transition-all ease-in-out duration-300')}>
                <div role="button"
                     onClick={collapse}
                     className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 " +
                         "opacity-0 group-hover/sidebar:opacity-100 transition",
                         isMobile && 'opacity-100')}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <UserInfo/>
                <SearchUser/>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100  transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
            </aside>
            <div ref={navbarRef}
                 className={cn('absolute top-0 z-[99999] left-0 ' +
                     ' w-full', isResetting &&
                     'transition-all ease-in-out duration-300', isMobile && 'left-0 w-full')}>
                <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>
            </div>
        </React.Fragment>
    );
};

export default SidebarCard;