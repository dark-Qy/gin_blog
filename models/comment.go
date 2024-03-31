package models

import (
	"errors"
	"gin_learn/dao"
)

// Comment 定义评论结构体
type Comment struct {
	CommentId int    `json:"commentId" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	Blog      Blog   `json:"blog" gorm:"foreignKey:BlogID"`
	BlogID    int    `json:"blogId" gorm:"index"` // 为BlogID创建索引，优化查询性能
	User      User   `json:"user" gorm:"foreignKey:UserId"`
	UserName  string `json:"userName"` // 用于存储User的外键
	Content   string `json:"content"`
}

func CreateComment(comment *Comment) (err error) {
	err = dao.DB.Debug().Create(&comment).Error
	if err != nil {
		return errors.New("create comment error")
	}
	return nil
}

func GetComment(id int, commentList *[]Comment) (err error) {
	err = dao.DB.Debug().Where("blog_id=?", id).Find(&commentList).Error
	if err != nil {
		return errors.New("get comment error")
	}
	return nil
}
