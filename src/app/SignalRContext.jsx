"use client"
import React, { createContext, useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const [pepegaTest, setPepegaTest] = useState("roflanebalo");
    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5000/hubs/sessionHub`, { withCredentials: false })
            .build();
        setConnection(newConnection);
       
    }, []);

    if (!connection) {
        return <div>Connecting...</div>;
    }

    return (
        <SignalRContext.Provider value={connection }>
            {children}
        </SignalRContext.Provider>
    );
};

//export default SignalRContext;
