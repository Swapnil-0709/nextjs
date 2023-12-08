'use client'

export const PrivateKeyParse = () => {
    if (typeof window !== 'undefined'){
        const storedAdmin = sessionStorage.getItem('private-chat-admin');
        if (typeof window !== 'undefined' && storedAdmin) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            return JSON.parse(storedAdmin);
        }
    }
};
