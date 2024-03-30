import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditBlog.css"

function EditBlog() {
    const [blog, setBlog] = useState({
        BlogTitle: '',
        BlogContent: '',
        BlogTag: '',
    });
    const { id } = useParams(); // 获取文章ID
    const navigate = useNavigate(); // 用于导航
    const token = localStorage.getItem("token"); // 从本地存储获取token

    useEffect(() => {
        // 获取当前文章的详情
        const fetchBlogDetail = async () => {
            const response = await fetch(`/blog/list/id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBlog({ // 假设返回的data就是文章详情
                    BlogTitle: data.BlogTitle,
                    BlogContent: data.BlogContent,
                    BlogTag: data.BlogTag
                });
            }
        };
        fetchBlogDetail();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('blogContent', blog.BlogContent); // 注意这里的属性名与状态中保持一致
        formData.append('blogTitle', blog.BlogTitle);
        formData.append('blogTag', blog.BlogTag);

        // 在这里添加更新文章的API调用
        const response = await fetch(`/blog/update/id=${id}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': token
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log("内容值是:" + blog.BlogContent);
            console.log("返回值是:" + JSON.stringify(data));
            alert("文章更新成功！");
            navigate(`/blog/${id}`); // 返回到文章详情页面
        } else {
            alert("文章更新失败，请重试！");
        }
    };

    return (
        <div className="blog-edit-container">
            <h2>编辑文章</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>文章标题:</label>
                    <input
                        type="text"
                        name="BlogTitle"
                        value={blog.BlogTitle}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>文章内容:</label>
                    <textarea
                        name="BlogContent"
                        value={blog.BlogContent}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>标签:</label>
                    <input
                        type="text"
                        name="BlogTag"
                        value={blog.BlogTag}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">提交更改</button>
            </form>
        </div>
    );
}

export default EditBlog;
