import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SocketContext } from '../../Context/SocketContext';

export const SocketWrapper = ({ children }) => {
    const { socket, triggered, updateTrigger } = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected socket')
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log("disconnected")
            setIsConnected(false);
        });

        socket.on('trigger', (msg) => {
            updateTrigger();
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('trigger');
        };
    }, []);

    return (
        <>
            {children}
        </>
    )
};