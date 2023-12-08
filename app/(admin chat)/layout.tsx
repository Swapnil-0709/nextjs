import React from 'react';
import SocketContext from "@/components/socket-provider";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <div
                className="h-full flex justify-center  bg-gray-200 dark:bg-[#1F1F1F] ">
                {/*<Navbar/>*/}
                <main className=" h-full overflow-y-auto  lg:w-[75vw] ">
                    <SocketContext>
                        {children}
                    </SocketContext>
                </main>
            </div>
        </React.Fragment>
    );
};

export default Layout;