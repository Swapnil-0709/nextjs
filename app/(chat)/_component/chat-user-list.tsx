'use client'

import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkeletonTime} from "@/components/skeleton-time";
import {Skeleton} from "@/components/ui/skeleton";

const ChatUserList = () => {

    if (SkeletonTime()) {
        return Array.from({length: 5}).map((_, index) => {
            return (<React.Fragment key={`SkeletonUserList${index}852`}>
                <div
                    className="flex items-center justify-between py-4 text-sm">
                    <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full"/>
                        <div className="ms-4">
                            <Skeleton className="h-4 w-16 rounded-md mb-1"/>
                            <Skeleton className="h-4 w-32 rounded-md"/>
                        </div>
                    </div>
                    <Skeleton className="h-4 w-8 rounded-md"/>
                </div>
            </React.Fragment>)
        })
    }
    return Array.from({length: 6}).map((_, index) => {
        return <React.Fragment key={`ChatUserList${index}`}>
            <div
                className="flex items-center justify-between py-4 text-sm">
                <div className="flex items-center">
                    <div>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="ms-4">
                        <div
                            className="font-bold text-gray-900 mb-1">
                            Jhon Doe
                        </div>
                        <div
                            className="font-medium text-xs text-gray-400">jhon@gmail.com
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col items-center ms-2">
                    <span className="text-gray-400 text-xs mb-1">5 hrs</span>
                </div>
            </div>
        </React.Fragment>
    })
};

export default ChatUserList;