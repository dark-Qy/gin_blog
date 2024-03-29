import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子
import './BlogList.css';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // 使用useNavigate钩子
    // 从本地获取存储的token令牌
    const token = localStorage.getItem("token")

    // 新增点击博客项的处理函数
    const handleBlogClick = (blogId) => {
        navigate(`/blog/list/${blogId}`);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blog/list',{
                method:'GET',
                headers:{
                    'Authorization': `${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setBlogs(data); // 直接设置获取到的 JSON 数据
            }
        };
        // eslint-disable-next-line
        fetchBlogs()
    }, [token]);



    return (
        <div className="blog-list-container">
            {blogs.map((blog) => (
                <div key={blog.blogId} className="blog-item" onClick={() => handleBlogClick(blog.blogId)}>
                    <h3 className="blog-title">{blog.BlogTitle}</h3>
                    <p className="blog-content">{blog.BlogContent}</p>
                    <p className="blog-tags">标签: {blog.BlogTag}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
