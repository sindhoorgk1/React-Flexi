import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CommentSystem.module.css';

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (isLoggedIn && userName) {
            setName(userName);
        }
    }, [isLoggedIn, userName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;

        onSubmit({
            name,
            text,
            date: new Date().toISOString(),
        });

        setText('');
        if (!isLoggedIn) {
            setName('');
        }
    };

    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <h3 className={styles.heading}>Leave a Comment</h3>

            <div className={styles.formGroup}>
                <label htmlFor="comment-name" className={styles.label}>Name</label>
                <input
                    id="comment-name"
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoggedIn}
                    placeholder="Your name"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="comment-text" className={styles.label}>Comment</label>
                <textarea
                    id="comment-text"
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                />
            </div>

            <button type="submit" className={styles.submitButton}>Post Comment</button>
        </form>
    );
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    userName: PropTypes.string,
};

export default CommentForm;
