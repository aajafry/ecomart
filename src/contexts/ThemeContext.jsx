/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        document.body.classList.toggle('dark');
        setIsDark(!isDark);
    }

    if (isDark) {
        document.body.classList.add("dark");
    }else {
        document.body.classList.remove('dark');
    }

    const value = {
        isDark,
        setIsDark,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}