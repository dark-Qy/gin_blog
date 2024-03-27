package models

// Comment 定义评论结构体
type Comment struct {
	CommentId int    `json:"commentId"`
	UserName  User   `json:"userName"`
	Content   string `json:"content"`
}
