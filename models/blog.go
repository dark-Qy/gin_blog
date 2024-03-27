package models

// Blog 定义博客结构体
// tag 是否需要使用枚举类？可以再考虑一下
type Blog struct {
	UserName    User      `json:"userName"`
	BlogContent string    `json:"blogContent"`
	CommentList []Comment `json:"commentList"`
	Tag         string    `json:"tag"`
}
