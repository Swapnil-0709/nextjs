'use client'

import React from 'react';
import SocketContext from "@/components/socket-provider";
import dynamic from "next/dynamic";
import Navbar from "@/app/(chat)/_component/navbar";


const SidebarCard = dynamic(() => import('./_component/sidebar-card'), {
    ssr: false,
});

const MainLayout = ({children}: { children: React.ReactNode }) => {

    return (
        <React.Fragment>
            <SocketContext>
                <div className="h-full flex bg-gray-100 dark:bg-[#1F1F1F]">
                    {/*<Navbar/>*/}
                    <SidebarCard/>
                    <main className="flex-1 h-full overflow-y-auto bg-gray-200">
                        {children}
                    </main>
                </div>
            </SocketContext>
        </React.Fragment>
    )
}

export default MainLayout;