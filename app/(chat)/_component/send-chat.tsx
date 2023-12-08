'use client'

import React, {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {PrivateKeyParse} from "@/app/(admin chat)/_component/private-key";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    useSocket
} from "@/components/socket-provider";
import {userChatListProps} from "@/components/interface-types";
import {Socket} from "socket.io-client";

interface props {
    setMessageList:any
}

const SendChat = ({setMessageList}: props) => {
    const params = useParams();
    const Socket:any = useSocket();
    const [message, setMessage] = useState<string>('');
    const adminUser = PrivateKeyParse();

    let ReceiverMessageId:string;
    let SenderMessageId:string;

    if (typeof window !== 'undefined'){
        const userChatID = sessionStorage.getItem('chat-user-id')
         ReceiverMessageId = (!adminUser?.id) ? (adminUser?.id || params?.adminToken) : (params?.publicToken || userChatID);
         SenderMessageId = (adminUser?.id) ? (adminUser?.id || params?.adminToken) : (params?.publicToken || userChatID)
    }

    const sendMessage = () => {

        const payload = {
            receiver: ReceiverMessageId,
            sender: SenderMessageId,
            message: message,
        }
        if (Socket) {
            Socket?.emit('message', payload);
        }
        setMessage('')
    }

    useEffect(() => {
        if (Socket) {
            Socket?.on(`message-${ReceiverMessageId}-${SenderMessageId}`, (newMessage: any) => {
                setMessageList(prevArray => [...prevArray, newMessage]);
                // console.log('newMessage', newMessage);
            })
        }
    }, [Socket]);
    return (
        <React.Fragment>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className=" text-secondary-foreground font-medium ring-transparent bg-primary/5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0"
                placeholder="Type a message..."/>
            <Button type="button" className="ms-2"
                    onClick={sendMessage}>Send</Button>
        </React.Fragment>
    );
};

export default SendChat;