import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import styles from './CommentSystem.module.css';

const CommentList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p className={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>;
    }

    // Ensure chronologically, most recent at bottom. 
    // Assuming the passed array is already in order or we sort it.
    // Requirement: "Comments should be ordered chronologically, with the most recent at the bottom."
    // Typically "recent at top" is common for social, but "recent at bottom" (standard forum/blog style) is requested.
    // We'll trust the order passed from parent, or we could sort here. Let's assume parent manages order.

    return (
        <div className={styles.commentList}>
            {comments.map((comment, index) => (
                <Comment
                    key={index} // Ideally use a unique ID if available
                    name={comment.name}
                    date={comment.date}
                    text={comment.text}
                    avatar={comment.avatar}
                />
            ))}
        </div>
    );
};

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
            text: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),
};

export default CommentList;
