'use client'

import React, {useEffect} from 'react';
import UserChat from "@/app/(chat)/_component/user-chat";
import {useRouter} from "next/navigation";


interface chatProps {
    accessToken: string,
    email: string,
    fullName: string,
    id: string
}

const Page = () => {
    const router = useRouter();

    let privateChat: chatProps = {
        accessToken: '',
        email: '',
        fullName: '',
        id: ''
    };
    if (typeof window !== 'undefined'){
        const storedAdmin = sessionStorage.getItem('private-chat-admin');
        if (storedAdmin) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            privateChat = JSON.parse(storedAdmin);
        }
    }

    useEffect(() => {
        if (!privateChat?.id) {
            router.push('/');
        }
    }, [privateChat]);
    return (
        <React.Fragment>
            <UserChat/>
        </React.Fragment>
    );
};

export default Page;