'use client'

import {toast} from "sonner";

export const GetUserId = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${API_URL}users/receiver`);
    const data = await response.json();
    if (data?.data?.receiver) {
        setTimeout(() => {
            toast.success(`Link has been copied successfully.`);
        }, 1000)
        return data.data.receiver
    }else{
        toast.error(`${data?.message}.`);
    }
};

