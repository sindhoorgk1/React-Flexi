import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    const toggleSearch = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            // If closing, clear query? Or keep it? Requirement: "Cancel button... to collapse it".
            // Usually cancelling clears search or keeps it but hides. Let's clear for "Cancel" feel.
            setQuery('');
            onSearch('');
        }
    };

    return (
        <div className={`${styles.searchBar} ${isExpanded ? styles.expanded : ''}`}>
            {/* Mobile Toggle Icon */}
            {!isExpanded && (
                <button
                    className={styles.mobileToggle}
                    onClick={toggleSearch}
                    aria-label="Open search"
                >
                    🔍
                </button>
            )}

            {/* Input Field */}
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Search posts..."
                    value={query}
                    onChange={handleInputChange}
                    aria-label="Search posts"
                />
                <span className={styles.searchIcon}>🔍</span>
            </div>

            {/* Cancel Button (Mobile Only) */}
            {isExpanded && (
                <button
                    className={styles.cancelButton}
                    onClick={toggleSearch}
                    aria-label="Close search"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
