import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子
import { useParams } from 'react-router-dom';
import './BlogDetail.css'; // 确保正确导入CSS文件

function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // 导入useNavigate钩子
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const response = await fetch(`/blog/list/id=${id}`,{
                method:'GET',
                headers:{
                    'Authorization': `${token}`
                }
            });// 使用博客ID从后端获取数据
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setBlog(data);
            }
        };

        fetchBlogDetail();
    }, [id,token]); // 依赖项为id，当id变化时重新获取数据

    const handleDelete = async () => {
        if (window.confirm("确定要删除这篇博客吗？")) {
            const response = await fetch(`/blog/delete/id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            });

            if (response.ok) {
                alert("博客删除成功！");
                navigate("/listAll"); // 删除后返回主页或博客列表页
            } else {
                alert("删除失败！");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/blog/edit/${id}`); // 假设你有一个博客编辑页面
    };

    return (
        <div className="blog-detail-container">
            {blog ? (
                <>
                    <div className="article-section article-title">
                        <h2>{blog.BlogTitle}</h2>
                    </div>
                    <div className="article-section article-content">
                        <p>{blog.BlogContent}</p>
                    </div>
                    <div className="article-section article-tags">
                        <span>标签: {blog.BlogTag}</span>
                    </div>
                    <div className="button-container">
                        <button onClick={handleEdit} className="edit-button">修改博客</button>
                        <button onClick={handleDelete} className="delete-button">删除博客</button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}


export default BlogDetail;
