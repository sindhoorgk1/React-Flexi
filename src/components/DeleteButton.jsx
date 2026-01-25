import React from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick }) => {
    return (
        <button className={styles.deleteButton} onClick={onClick}>
            Delete
        </button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
