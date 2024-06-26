import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子
import { useParams } from 'react-router-dom';
import './BlogDetail.css'; // 确保正确导入CSS文件

function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]); // 用于存储评论列表
    // eslint-disable-next-line
    const [comment ,setComment] = useState({
        blogId:'',
        userName:'',
        content:''
    })
    const [newComment, setNewComment] = useState(''); // 用于绑定新评论的输入框
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
                if (data.status === 2001) {
                    // 使用alert函数显示成功信息
                    alert(`查看博客失败！${data.error}`);
                }else {
                    setBlog(data);
                }
            }

            // 获取评论的代码
            const commentsResponse = await fetch(`/comment/list/id=${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            if (commentsResponse.ok) {
                const commentsData = await commentsResponse.json();
                setComments(commentsData); // 假设后端直接返回评论列表
                console.log(commentsData);
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("userName")
        comment.content=newComment
        comment.blogId=parseInt(id)
        comment.userName=userName

        if (!newComment.trim()) return; // 防止提交空评论

        const response = await fetch(`/comment/add`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment) // 假设后端需要的格式
        });
        console.log(JSON.stringify(comment))

        if (response.ok) {
            // 获取返回的data值
            const data = await response.json(); // 获取添加的评论
            if(data.status===0){
                alert("评论成功!")
                window.location.reload();
            }
        } else {
            alert("评论提交失败，请重试！");
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (window.confirm("确定要删除这条评论吗？")) {
            const response = await fetch(`/comment/delete/id=${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });
            if (response.ok) {
                alert("评论删除成功！");
                // 更新评论列表，移除已删除的评论
                window.location.reload();
            } else {
                alert("删除评论失败，请重试！");
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
                    <div className="article-section article-user">
                        <p>作者: {blog.UserName}</p>
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
                    <div className="comments-section">
                        <h3>评论</h3>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="写下你的评论..."
                            ></textarea>
                            <button type="submit">提交评论</button>
                        </form>
                        <div className="comments-list">
                            {comments.map((comment, index) => (
                                <div key={comment.commentId} className="comment-item">
                                    <p><strong>{comment.userName}:</strong> {comment.content}</p>
                                    <button onClick={() => handleCommentDelete(comment.commentId)}
                                            className="delete-comment-button">删除评论
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}


export default BlogDetail;
