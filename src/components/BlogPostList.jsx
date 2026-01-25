import React from 'react';
import PropTypes from 'prop-types';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <div className={styles.emptyMessage}>No blog posts available.</div>;
    }

    return (
        <div className={styles.blogPostList}>
            {posts.map((post) => (
                <BlogPostItem
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    summary={post.summary}
                    date={post.date}
                    url={post.url}
                />
            ))}
        </div>
    );
};

BlogPostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BlogPostList;
