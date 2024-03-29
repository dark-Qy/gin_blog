package models

import (
	"errors"
	"gin_learn/dao"
)

// Blog 定义博客结构体
// 不需要把评论的信息列举出来，评论的内容可以去comments里面找与本blog关联的blog_id即可
type Blog struct {
	BlogId      int    `form:"blogId" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	BlogTitle   string `form:"blogTitle"`
	User        User   `form:"user" gorm:"foreignKey:UserId"` // 注意调整字段名和外键
	UserName    int    `form:"userName"`                      // 用于存储User的外键                         // 用于存储User的外键
	BlogContent string `form:"blogContent" gorm:"type:text"`
	BlogTag     string `form:"blogTag"` // 考虑改进标签存储方式
}

func CreateBlog(blog *Blog) (err error) {
	// 根据blog中的内容新建信息
	err = dao.DB.Create(&blog).Error
	if err != nil {
		return errors.New("create blog error")
	}
	return nil
}

func GetAllBlog(blogList *[]Blog) (err error) {
	// 从数据库中读取所有的blog
	err = dao.DB.Debug().Find(&blogList).Error
	if err != nil {
		return errors.New("read blog error")
	}
	return nil
}

func GetABlog(blogId int) (blog *Blog, err error) {
	blog = new(Blog)
	// 从数据库中读取特定的blog
	err = dao.DB.Debug().Where("blog_id=?", blogId).First(blog).Error
	if err != nil {
		return nil, errors.New("read blog error")
	}
	return
}
