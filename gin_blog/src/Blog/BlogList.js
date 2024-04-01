import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子
import './BlogList.css';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // 使用useNavigate钩子
    // 存储用户的搜索输入
    const [searchTerm, setSearchTerm] = useState('');
    // 从本地获取存储的token令牌
    const token = localStorage.getItem("token")

    // 新增点击博客项的处理函数
    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    const handleSearch = async () => {
        // 防止发送空的搜索请求
        if (!searchTerm.trim()) return;

        try {
            const response = await fetch(`/blog/search/query=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                if(data.status === 0){
                    setBlogs(data.blogList); // 假设后端返回的是一个博客列表
                }
                else if (data.status === 9001){
                    alert(`请先登录`);
                }
                else {
                    alert(`请先登录`);
                }
            } else {
                alert(`搜索失败: ${response.statusText}`);
            }
        } catch (error) {
            console.error('发生错误:', error);
            alert(`搜索出错: ${error.message}`);
        }
    };


    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blog/list',{
                method:'GET',
                headers:{
                    'Authorization': `${token}`
                }
            });
            console.log(JSON.stringify(response.status))
            if (response.ok) {
                const data = await response.json();
                if(data.status === 0){
                    setBlogs(data.blogList); // 假设后端返回的是一个博客列表
                }
                else if (data.status === 9001){
                    alert(`请先登录`);
                }
                else{
                    alert(`查看失败！${data.error}`);
                }
            } else {
                alert(`搜索失败: ${response.statusText}`);
            }
        };
        // eslint-disable-next-line
        fetchBlogs()
    }, [token]);



    return (
        <div className="blog-list-container">
            <div className="search-container">
                <h2>关键词检索</h2>
                <input
                    type="text"
                    placeholder="搜索博客..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>搜索</button>
            </div>
            <h2>所有博客</h2>
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
