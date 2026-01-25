import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
    const dialogRef = useRef(null);
    const deleteButtonRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus on the dialog or the cancel button when opened for accessibility
            // Focusing the dialog container is good practice for screen readers
            dialogRef.current?.focus();

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
                // Focus trap logic could be added here for a fully robust modal
                // For this challenge, we rely on the implementation simplicity
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.dialog}
                role="dialog"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                ref={dialogRef}
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="dialog-title" className={styles.title}>Confirm Deletion</h2>
                <p id="dialog-description" className={styles.description}>Are you sure you want to delete this post?</p>
                <div className={styles.buttons}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                    <button className={styles.confirmButton} onClick={onConfirm} ref={deleteButtonRef}>Delete</button>
                </div>
            </div>
        </div>
    );
};

ConfirmationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
