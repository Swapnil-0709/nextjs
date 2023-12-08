'use client'
import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import io, {Socket} from "socket.io-client";
import {toast} from "sonner";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}


const AdminSocketContext = createContext(null);

type WithChildren = {
    children?: ReactNode
}
const SocketContext: FC<WithChildren> = ({children}) => {

    // const admin_ID= 'admin'

    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

    // const queryParams = {user_id: admin_ID};

    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

    useEffect(() => {

        let newSocket: Socket<ServerToClientEvents, ClientToServerEvents>;

        function connectToServer(socketURL:string|undefined) {
            return new Promise((resolve, reject) => {
                if (!socketURL) {
                    reject(new Error('Socket URL is not provided.'));
                    return;
                }

                const newSocket = io(socketURL, { autoConnect: true});

                newSocket.on('connect_error', (err) => {
                    reject(new Error('Error connecting to the server'));
                });

                newSocket.on('disconnect', (reason) => {
                    reject(new Error('Disconnected.'));
                });

                newSocket.on('connect', () => {
                    setSocket(newSocket)
                    resolve(newSocket);
                });
            });
        }

        const promise = connectToServer(socketURL)

        toast.promise(promise, {
            loading: 'Connecting to the server...',
            success: (socket) => {

                return 'Connection successful';
            },
            error: (error) => {
                // Handle the error
                // console.error(error.message);
                return `Error connecting to the server`;
            },
        });

        // Clean up the socket connection when the component unmounts or admin is offline
        return () => {
            newSocket?.disconnect();
        };
    }, []);
    return (
        <AdminSocketContext.Provider value={socket}>
            {children}
        </AdminSocketContext.Provider>
    );
}

export default SocketContext;
export {AdminSocketContext}
export const useSocket = () => {
    return useContext(AdminSocketContext);
}