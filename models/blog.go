package models

// Blog 定义博客结构体
// tag 是否需要使用枚举类？可以再考虑一下
type Blog struct {
	BlogId      int       `json:"blogId" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	User        User      `json:"user" gorm:"foreignKey:UserId"` // 注意调整字段名和外键
	UserId      int       `json:"userId"`                        // 用于存储User的外键
	BlogContent string    `json:"blogContent"`
	CommentList []Comment `json:"commentList"` // ?
	TagList     string    `json:"tagList"`     // 考虑改进标签存储方式
}
