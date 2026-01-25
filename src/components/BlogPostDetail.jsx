import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ id, title, content, author, date, onDelete, comments, onAddComment }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    if (!title || !content || !author || !date) {
        return <div className={styles.notFound}>Blog post not found.</div>;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(id);
        setIsDeleteDialogOpen(false); // Clean up state, though component usually unmounts
    };

    const handleCloseDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className={styles.blogPostDetail}>
            <div className={styles.headerActions}>
                {/* Space for actions if needed, or Delete button can be placed here or at bottom */}
                {/* Requirement says Delete button on blog post view. Let's put it top right or bottom.
               Given the designs usually put actions together, let's render it within the detail container 
               or perhaps passed from parent. But for structure, let's keep it here. 
           */}
            </div>

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
