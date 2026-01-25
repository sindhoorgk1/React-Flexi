import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setContent(post.content || '');
            setAuthor(post.author || '');
            // Format date for input: YYYY-MM-DD (Local time)
            const d = new Date(post.date);
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                setDate(`${year}-${month}-${day}`);
            } else {
                setDate(post.date || '');
            }
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!title.trim()) newErrors.title = 'Required';
        if (!content.trim()) newErrors.content = 'Required';
        if (!author.trim()) newErrors.author = 'Required';
        if (!date.trim()) newErrors.date = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit({
                ...post,
                title, // Keep existing ID if editing
                content,
                author,
                date,
            });
        }
    };

    return (
        <form className={styles.blogPostForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <div className={styles.inputWrapper}>
                    <input
                        id="title"
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className={styles.error}>{errors.title}</p>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.label}>Content</label>
                <div className={styles.inputWrapper}>
                    <textarea
                        id="content"
                        className={styles.textarea}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                    />
                    {errors.content && <p className={styles.error}>{errors.content}</p>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="author" className={styles.label}>Author</label>
                <div className={styles.inputWrapper}>
                    <input
                        id="author"
                        type="text"
                        className={styles.input}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    {errors.author && <p className={styles.error}>{errors.author}</p>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.label}>Publication Date</label>
                <div className={styles.inputWrapper}>
                    <input
                        id="date"
                        type="date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <p className={styles.error}>{errors.date}</p>}
                </div>
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton}>
                    {post ? 'Update Post' : 'Create Post'}
                </button>
            </div>
        </form>
    );
};

BlogPostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.string,
        date: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};

export default BlogPostForm;
