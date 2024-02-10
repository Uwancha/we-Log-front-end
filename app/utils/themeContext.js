import { createContext, useContext, useState } from "react";

// Create theme context
const ThemeContext = createContext(null);

// Create theme context provider. This will provide theme context to those that it wraps
export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

// This custom hook provide easy access to theme state and its setter
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('Context unavailable!')
    }

    return {
        context
    }
}

