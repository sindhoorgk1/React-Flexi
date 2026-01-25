import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import Layout from './components/Layout';
import './App.css';

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: `
      <p>React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
      <p>In this tutorial, we will cover:</p>
      <ul>
        <li>Components and Props</li>
        <li>State and Lifecycle</li>
        <li>Handling Events</li>
      </ul>
      <p>By the end, you'll have a working interactive app!</p>
    `,
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: `
      <p>CSS Grid and Flexbox are two powerful layout systems available in modern CSS. While they share some similarities, they are designed for different problems.</p>
      <h3>Flexbox</h3>
      <p>Flexbox is largely a one-dimensional system (rows OR columns). It is perfect for aligning items within a container.</p>
      <h3>CSS Grid</h3>
      <p>CSS Grid is a two-dimensional system (rows AND columns). It is ideal for defining the overall layout of a page.</p>
    `,
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: `
      <p>Web accessibility is about designing and developing websites and tools that people with disabilities can use.</p>
      <p>Key areas to focus on include:</p>
      <ul>
        <li>Semantic HTML</li>
        <li>Keyboard Navigation</li>
        <li>Color Contrast</li>
        <li>ARIA Attributes</li>
      </ul>
    `,
    author: 'Emily White',
    date: '2023-03-10',
    url: '/posts/3',
  },
  {
    id: '4',
    title: 'State Management in 2023',
    summary: 'Exploring the landscape of state management libraries.',
    content: `
      <p>State management is a crucial part of any complex application. In 2023, we have more options than ever.</p>
      <p>Popular choices include:</p>
      <ul>
        <li>Redux Toolkit</li>
        <li>Zustand</li>
        <li>Jotai</li>
        <li>Recoil</li>
        <li>React Context</li>
      </ul>
    `,
    author: 'Michael Brown',
    date: '2023-04-05',
    url: '/posts/4',
  },
  {
    id: '5',
    title: 'The Future of Web Design',
    summary: 'Trends and technologies shaping the future of web design.',
    content: `
      <p>Web design is constantly evolving. As we look ahead, several trends are emerging that will shape the digital landscape.</p>
      <p>Expect to see more of:</p>
      <ul>
        <li>Immersive 3D elements</li>
        <li>Micro-interactions</li>
        <li>Dark mode standardization</li>
        <li>AI-generated layouts</li>
      </ul>
    `,
    author: 'Sarah Lee',
    date: '2023-05-20',
    url: '/posts/5',
    comments: []
  }
];

const BlogPostPage = ({ posts, onDelete, onAddComment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Link to={`/posts/${id}/edit`} className="action-link">Edit Post</Link>
      </div>
      <BlogPostDetail
        id={post.id}
        title={post.title}
        content={post.content}
        author={post.author}
        date={post.date}
        onDelete={() => {
          onDelete(post.id);
          navigate('/');
        }}
        comments={post.comments}
        onAddComment={(comment) => onAddComment(post.id, comment)}
      />
    </div>
  );
};

const CreatePostPage = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleCreate = (data) => {
    onCreate(data);
    navigate('/');
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <BlogPostForm onSubmit={handleCreate} />
    </div>
  );
};

const EditPostPage = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  const handleUpdate = (data) => {
    onUpdate(data);
    navigate(`/posts/${id}`);
  };

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>Edit Post</h1>
      <BlogPostForm post={post} onSubmit={handleUpdate} />
    </div>
  );
};

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = (newPostData) => {
    const newPost = {
      ...newPostData,
      id: String(posts.length + 1), // Simple ID generation
      url: `/posts/${posts.length + 1}`,
      // Use summary from content if not provided?
      // For simplicity, we'll assume summary is same as content or truncated content
      summary: newPostData.content.substring(0, 100) + '...',
      comments: []
    };
    setPosts([...posts, newPost]);
  };

  const handleUpdatePost = (updatedPostData) => {
    // Recalculate summary if content changed
    const updatedPost = {
      ...updatedPostData,
      summary: updatedPostData.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...',
      comments: updatedPostData.comments || []
    };
    setPosts(posts.map(p => p.id === updatedPostData.id ? updatedPost : p));
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...(p.comments || []), comment]
        };
      }
      return p;
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <Layout onSearch={handleSearch}>
      <Routes>
        <Route path="/" element={
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1>{searchQuery ? `Search Results for "${searchQuery}"` : 'Blog Posts'}</h1>
              <Link to="/posts/new" className="action-button">Create New Post</Link>
            </div>
            {filteredPosts.length > 0 ? (
              <BlogPostList posts={filteredPosts} />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No posts found matching your search.</p>
              </div>
            )}
          </>
        } />
        <Route path="/blog" element={
          <>
            <h1>Blog Archive</h1>
            <BlogPostList posts={posts} />
          </>
        } />
        <Route path="/about" element={
          <div>
            <h1>About Us</h1>
            <p>Welcome to My Tech Blog. We share the latest in technology and development.</p>
          </div>
        } />
        <Route path="/posts/:id" element={<BlogPostPage posts={posts} onDelete={handleDeletePost} onAddComment={handleAddComment} />} />
        <Route path="/posts/new" element={<CreatePostPage onCreate={handleCreatePost} />} />
        <Route path="/posts/:id/edit" element={<EditPostPage posts={posts} onUpdate={handleUpdatePost} />} />
      </Routes>
    </Layout>
  );
}

export default App;
