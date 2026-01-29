'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children, initialThemes }) {
    const [themes, setThemes] = useState(initialThemes || []);
    const [currentTheme, setCurrentTheme] = useState('grayscale');

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            setCurrentTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const setTheme = (themeId) => {
        setCurrentTheme(themeId);
        if (themeId === 'grayscale') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', themeId);
        }
        localStorage.setItem('portfolio-theme', themeId);
    };

    return (
        <ThemeContext.Provider value={{ themes, currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
