'use client'
import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {SkeletonTime} from "@/components/skeleton-time";
import {PrivateKeyParse} from "@/app/(admin chat)/_component/private-key";
import {userChatListProps} from "@/components/interface-types";

const ChatConversation = ({messageList}: any) => {
    const adminUser = PrivateKeyParse();
    if (SkeletonTime()) {
        return Array.from({length: 3}).map((_, index) => {
            return (<React.Fragment key={`Skeleton${index}852`}>
                <div
                    className="flex w-fit max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm bg-violet-100">
                    <Skeleton className="h-7 w-60 rounded-md mb-1"/>
                    <div className="flex justify-end">
                        <Skeleton className="h-4 w-16 rounded-md"/>
                    </div>
                </div>
                <div
                    className="flex w-fit max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm ml-auto bg-blue-100">
                    <Skeleton className="h-7 w-60 rounded-md mb-1"/>
                    <div className="flex justify-end">
                        <Skeleton className="h-4 w-16 rounded-md"/>
                    </div>
                </div>
            </React.Fragment>)
        })
    }


    return (<React.Fragment key={`SkeletonChats852`}>
            {messageList && messageList.length > 0 && messageList.map((item: any) => (
                <React.Fragment key={`MessageList${item?._id}`}>
                    <div
                        className={`flex w-fit max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm  ${(item?.sender === adminUser?.id) ? 'ml-auto bg-blue-100 ' : 'bg-violet-100'}`}>
                        {item?.message}
                        <div className="text-[10px] text-right">
                            {new Date(item?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </React.Fragment>
    )
        ;
};

export default ChatConversation;