import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, url }) => {
  return (
    <div className={styles.blogPostItem}>
      <Link to={url} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {date}</p>
    </div>
  );
};

BlogPostItem.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BlogPostItem;
