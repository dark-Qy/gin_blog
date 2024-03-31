import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子
import './CreateBlog.css';


function BlogPost() {
    const navigate = useNavigate(); // 导入useNavigate钩子
    const [blog, setBlog] = useState({
        blogId: '',
        userId: '',
        blogContent: '',
        blogTitle:'',
        blogTag: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 从本地获取存储的token令牌
        const token = localStorage.getItem("token")
        const userName = localStorage.getItem("userName")

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('blogContent', blog.blogContent);
        formData.append('blogTitle', blog.blogTitle);
        formData.append('blogTag', blog.blogTag);

        try {
            const response = await fetch('/blog/create', {
                method: 'POST',
                body: formData,
                headers:{
                    'Authorization': `${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status ===0 ){
                    alert(`博客创建成功！`);
                    navigate(`/listAll`);
                }
                else{
                    alert(`创建失败！${data.error}`);
                }
            } else {
                console.error('创建失败:', response.statusText);
                alert(`创建失败: ${response.statusText}`);
            }
        } catch (error) {
            console.error('发生错误:', error);
            alert(`发生错误: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>新建博客</h2>
            <div className="form-field">
                <label htmlFor="blogTitle">博客标题:</label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={blog.blogTitle}
                    onChange={handleChange}
                    placeholder="编写你的博客标题..."
                />
            </div>
            <div className="form-field">
                <label htmlFor="blogContent">博客内容:</label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={blog.blogContent}
                    onChange={handleChange}
                    placeholder="编写你的博客内容..."
                ></textarea>
            </div>
            <div className="form-field">
                <label htmlFor="blogTag">标签:</label>
                <input
                    type="text"
                    id="blogTag"
                    name="blogTag"
                    value={blog.blogTag}
                    onChange={handleChange}
                    placeholder="添加标签"
                />
            </div>
            <button type="submit" className="submit-button">提交</button>
        </form>
    );
}

export default BlogPost;
