import React, { useState } from 'react';
import socketio from "socket.io-client";
import { SERVER_BASE_URL } from '../apiManager/endPoints/config';

export const SocketContext = React.createContext();

const SocketContextProvider = ({ children }) => {
    const socket = socketio.connect(SERVER_BASE_URL);
    const [triggered, setTriggered] = useState({ status: false });

    const updateTrigger = () => {
        setTriggered((prevState) => ({
            ...prevState,
            status: !prevState.status,
        }));
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                triggered,
                updateTrigger
            }}
        >
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;