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
        navigate(`/blog/${blogId}`);
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
                if (data.status === 2001) {
                    // 使用alert函数显示成功信息
                    alert(`查看博客失败！${data.error}`);
                }else {
                    setBlogs(data);
                }
            }
        };
        // eslint-disable-next-line
        fetchBlogs()
    }, [token]);



    return (
        <div className="blog-list-container">
            {blogs.map((blog) => (
                <div key={blog.BlogId} className="blog-item" onClick={() => handleBlogClick(blog.BlogId)}>
                    <h3 className="blog-title">{blog.BlogTitle}</h3>
                    <p className="blog-content">{blog.BlogContent}</p>
                    <p className="blog-tags">标签: {blog.BlogTag}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
