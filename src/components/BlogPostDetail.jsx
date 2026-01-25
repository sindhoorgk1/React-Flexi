import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './BlogPostDetail.module.css';

// Component to display full details of a blog post
// Includes Delete, Comment Listing, and Comment Form functionalities
const BlogPostDetail = ({ id, title, content, author, date, onDelete, comments, onAddComment }) => {
    // State to manage the delete confirmation dialog visibility
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    if (!title || !content || !author || !date) {
        return <div className={styles.notFound}>Blog post not found.</div>;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // Show confirmation dialog
    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        onDelete(id);
        setIsDeleteDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className={styles.blogPostDetail}>
            {/* ... Content ... */}
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.author}>By {author}</p>
            <p className={styles.date}>Published on {formattedDate}</p>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className={styles.actions}>
                <DeleteButton onClick={handleDeleteClick} />
            </div>

            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />

            {/* Comment Section */}
            <div className={styles.commentSection}>
                <h3 className={styles.heading}>Comments</h3>
                <CommentList comments={comments} />
                <CommentForm onSubmit={onAddComment} isLoggedIn={false} />
            </div>
        </div>
    );
};

BlogPostDetail.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    onDelete: PropTypes.func,
    comments: PropTypes.array,
    onAddComment: PropTypes.func,
};

export default BlogPostDetail;
