'use client'

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Copy} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import ChatConversation from "@/app/(chat)/_component/chat-conversation";
import {Skeleton} from "@/components/ui/skeleton";
import {SkeletonTime} from "@/components/skeleton-time";
import {PrivateKeyParse} from "@/app/(admin chat)/_component/private-key";
import {useRouter} from "next/navigation";
import {GetUserId} from "@/app/(admin chat)/_component/get-user-id";
import SendChat from "@/app/(chat)/_component/send-chat";
import {useSocket} from "@/components/socket-provider";
import {userChatListProps} from "@/components/interface-types";


const UserChat = () => {
    const router = useRouter()
    const [copyIcon, setCopyIcon] = useState(false);
    const PrivateKey = PrivateKeyParse();
    const Socket: any = useSocket();
    const [messageList, setMessageList] = useState<userChatListProps[]>([])

    useEffect(() => {
        async function callUser() {
            const API_URL = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${API_URL}users/receiver`);
            const data = await response.json();
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('chat-user-id', data.data.receiver.id)
            }
        }
        callUser();

    }, []);


    useEffect(() => {
        if (Socket) {
            Socket?.emit(`init-message-list`, (allMessage: any) => {
                setMessageList(allMessage)
            })
        }
    }, [Socket]);

    const CopyUrl = async () => {
        let PublicURL;
        if (typeof window !== 'undefined') {
            PublicURL = window.location.origin
        }
        setCopyIcon(true);
        const user = await GetUserId();
        await navigator.clipboard.writeText(`${PublicURL}/public-chat/${user.id}/${PrivateKey.id}`);
        sessionStorage.setItem('chat-user-id', user.id)
        setTimeout(() => {
            setCopyIcon(false);
        }, 2000)
    }
    const OnIconSelect = (icon: string) => {
        console.log('icon', icon);
    }

    const clearAuthKey = () => {
        sessionStorage.removeItem('private-chat-admin');
        router.push('/')
    }
    return (
        <React.Fragment>
            <Card className="mx-2 mt-4 h-[95vh] lg:h-[89vh]">
                <CardHeader
                    className="flex flex-row justify-between items-stretch min-h[70px] border-b">
                    <UserAvatarInfo PrivateKey={PrivateKey}/>
                    <div className="flex items-center gap-x-2">
                        {PrivateKey?.id && <>
                            <Button size="sm" variant="outline"
                                    onClick={() => CopyUrl()}
                                    type="button">{copyIcon ? 'copied' : 'Copy url'}
                                {copyIcon && <Copy className="w-3 ms-2 h-3"/>}
                            </Button>
                            <Button size="sm" variant="outline" type="button"
                                    onClick={clearAuthKey}>
                                Leave
                            </Button></>}
                    </div>
                </CardHeader>
                <CardContent className="p-6 pb-3 lg:pb-6">
                    <ScrollArea
                        className="h-[calc(100vh-240px)] lg:h-[67vh] pe-3 border-b">
                        <div className="space-y-4 ">
                            <ChatConversation messageList={messageList}/>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="pt-0">
                    <div className="flex w-full items-center ">
                        {/*<Button variant="outline" size="sm" className="mr-2">*/}
                        {/*    <Upload className="w-4 h-4 text-gray-600"/>*/}
                        {/*</Button>*/}
                        {/*<IconPicker onChange={OnIconSelect}>*/}
                        {/*    <p className="text-6xl hover:opacity-75 transition mr-2">*/}
                        {/*        <Smile className="lg:w-6 lg:h-6 w-4 h-4 text-gray-600"/>*/}
                        {/*    </p>*/}
                        {/*</IconPicker>*/}
                        <SendChat setMessageList={setMessageList}/>
                    </div>
                </CardFooter>
            </Card>
        </React.Fragment>
    );
};

export default UserChat;


function UserAvatarInfo({PrivateKey}: any) {

    if (SkeletonTime()) {
        return <div className="flex items-stretch">
            <div>
                <Skeleton className="h-10 w-10 rounded-full"/>
            </div>
            <div className="ms-4">
                <Skeleton className="h-5 w-36 mb-1"/>
                <Skeleton className="h-3 w-16 "/>
            </div>
        </div>
    }
    return <div className="flex items-stretch">
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
                className="font-bold text-gray-900 ">
                {PrivateKey?.fullName || 'Unknown user'}
            </div>
            {/*<div className="flex items-center">*/}
            {/*    <Circle*/}
            {/*        className="h-[0.6rem] w-[0.6rem] mr-1 text-emerald-500 bg-emerald-500 rounded-full mb-[1.5px]"/>*/}
            {/*    <div*/}
            {/*        className="font-medium text-xs text-gray-400">Active*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>;
}