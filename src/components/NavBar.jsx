import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';

// Navigation Bar Component
// Handles navigation links, search bar integration, and mobile responsive menu
const NavBar = ({ onSearch }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle logic for mobile hamburger menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close menu when a link is clicked
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={styles.navBar}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>BlogApp</Link>

            {/* Desktop Links */}
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/about">About</Link>
            </div>

            <SearchBar onSearch={onSearch} />

            {/* Mobile Toggle */}
            <button
                className={styles.hamburger}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/blog" onClick={closeMenu}>Blog</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
