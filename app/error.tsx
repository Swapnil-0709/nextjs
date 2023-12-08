'use client'

import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
    return (
        <React.Fragment>
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Image src="/error.png" alt="error image" width={300} height={300} className="dark:hidden"/>
                <h2 className="text-xl font-medium">Something went wrong</h2>
                <Button asChild>
                    <Link href="/new">Go back</Link>
                </Button>
            </div>
        </React.Fragment>
    );
};

export default Error;