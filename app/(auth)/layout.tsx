import React from 'react';

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <div className="h-full flex  dark:bg-[#1F1F1F] bg-[url('/hero-bg.jpg')] bg-no-repeat bg-fixed bg-cover bg-[#fcfcfc]">
                <main className="flex-1 h-full overflow-y-auto ">
                    {children}
                </main>
            </div>
        </React.Fragment>
    );
};

export default Layout;