package models

// Comment 定义评论结构体
type Comment struct {
	CommentId int    `json:"commentId" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	Blog      Blog   `json:"blog" gorm:"foreignKey:BlogID"`
	BlogID    int    `gorm:"index"` // 为BlogID创建索引，优化查询性能
	User      User   `json:"user" gorm:"foreignKey:UserId"`
	UserId    int    `json:"userId"` // 用于存储User的外键
	Content   string `json:"content"`
}
