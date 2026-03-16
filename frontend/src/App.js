/**
 * @fileoverview Application entry component.
 */

import React, {useEffect, useState} from 'react';
import './App.css';
import {TodoApp} from './features/todos/TodoApp';

const THEME_KEY = 'kavia.theme';

/**
 * Reads saved theme.
 * @return {'light'|'dark'} Theme value.
 */
function readTheme() {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === 'dark' ? 'dark' : 'light';
}

/**
 * PUBLIC_INTERFACE
 * Root app component.
 * @return {JSX.Element} App.
 */
function App() {
    const [theme, setTheme] = useState(() => readTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            window.localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // ignore
        }
    }, [theme]);

    /**
     * PUBLIC_INTERFACE
     * Toggles between light and dark theme.
     */
    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }

    return (
        <div className="App">
            <header className="topBar">
                <div className="topBarInner">
                    <div className="brand">
                        <span className="brandMark">K</span>
                        <span className="brandText">Todo</span>
                    </div>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        type="button"
                    >
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </button>
                </div>
            </header>

            <main className="page">
                <TodoApp />
            </main>
        </div>
    );
}

export default App;
