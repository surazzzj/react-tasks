import { createContext, useState } from "react";

export const ThemeCtx = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            return newTheme;
        });
    };

    const contextValue = {
        theme,
        toggleTheme
    };

    return (
        <ThemeCtx.Provider value={contextValue}>
            <div className={`theme-${theme}`} style={{
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
                transition: 'background-color 0.3s ease'
            }}>
                {children}
            </div>
        </ThemeCtx.Provider>
    );
};

export default ThemeProvider;