import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const { id } = useParams(); // 获取URL参数中的id

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const response = await fetch(`/blog/list/${id}`); // 使用博客ID从后端获取数据
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            }
        };

        fetchBlogDetail();
    }, [id]); // 依赖项为id，当id变化时重新获取数据

    return (
        <div>
            {blog ? (
                <div>
                    <h2 className="blog-title">{blog.BlogTitle}</h2>
                    <p className="blog-content">{blog.BlogContent}</p>
                    <p className="blog-tags">标签: {blog.BlogTag}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogDetail;
