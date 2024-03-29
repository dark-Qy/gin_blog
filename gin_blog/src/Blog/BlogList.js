import React, { useState, useEffect } from 'react';
import './BlogList.css';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blog/list');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs);
            }
        };

        fetchBlogs()
    }, []);

    return (
        <div className="blog-list-container">
            {blogs.map((blog) => (
                <div key={blog.blogId} className="blog-item">
                    <h3 className="blog-title">{blog.blogTitle}</h3>
                    <p className="blog-content">{blog.blogContent}</p>
                    <p className="blog-tags">标签: {blog.blogTag}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
