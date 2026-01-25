import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentSystem.module.css';

const Comment = ({ name, date, text, avatar }) => {
    const formattedDate = new Date(date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });

    const getInitials = (n) => {
        return n ? n.charAt(0).toUpperCase() : '?';
    };

    return (
        <div className={styles.comment}>
            <div className={styles.avatar}>
                {avatar ? <img src={avatar} alt={`${name}'s avatar`} /> : getInitials(name)}
            </div>
            <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentName}>{name}</span>
                    <span className={styles.commentDate}>{formattedDate}</span>
                </div>
                <p className={styles.commentText}>{text}</p>
            </div>
        </div>
    );
};

Comment.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
};

export default Comment;
