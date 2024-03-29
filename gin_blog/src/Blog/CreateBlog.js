import React, { useState } from 'react';
import './CreateBlog.css';


function BlogPost() {
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

    const handleTagsChange = (index, value) => {
        const newTagList = [...blog.tagList];
        newTagList[index] = value;
        setBlog({
            ...blog,
            tagList: newTagList
        });
    };

    const addTagField = () => {
        setBlog({
            ...blog,
            tagList: [...blog.tagList, '']
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
                    alert(`博客创建成功！${data.blogTitle}`);
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
            {/* 其他字段... */}
            <div className="form-field title-field">
                <textarea
                    name="blogTitle"
                    value={blog.blogTitle}
                    onChange={handleChange}
                    placeholder="编写你的博客标题..."
                ></textarea>
            </div>
            <div className="form-field content-field">
                <textarea
                    name="blogContent"
                    value={blog.blogContent}
                    onChange={handleChange}
                    placeholder="编写你的博客内容..."
                ></textarea>
            </div>
            <div className="form-field tag-field">
                <textarea
                    name="blogTag"
                    value={blog.blogTag}
                    onChange={handleChange}
                    placeholder="添加标签"
                ></textarea>
            </div>
            <button type="submit" className="submit-button">提交</button>
        </form>

    );
}

export default BlogPost;
