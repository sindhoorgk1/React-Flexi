import React from 'react';
import NavBar from './NavBar';
import styles from './Layout.module.css';

// Main Layout component wrapping the application
// Provides consistent structure with Header (NavBar), Main Content, and Footer
const Layout = ({ children, onSearch }) => {
    return (
        <div className={styles.layout}>
            <header>
                <NavBar onSearch={onSearch} />
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2023 BlogApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
