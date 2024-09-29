/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from 'react';

const SidebarContext = React.createContext();

export const useSidebar = () => {
    return useContext(SidebarContext)
}

export const SidebarProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const value = {
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar
    }

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}