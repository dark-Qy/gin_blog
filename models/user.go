package models

import (
	"errors"
	"gin_learn/dao"
)

// User 定义用户结构体
// 结构体中，首字母大写相当于public，首字母小写相当于private(相对于包来说)
type User struct {
	// 添加Json渲染
	UserId   int    `json:"userId" gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	UserName string `json:"userName" gorm:"UNIQUE"`
	Password string `json:"password"`
}

// CreateUser 新建一个用户
func CreateUser(user *User) (err error) {
	// 首先根据userName查找是否已经存在该用户，如果存在则不能注册
	err = dao.DB.Debug().Where("user_name=?", user.UserName).First(&user).Error
	if user.UserId != 0 {
		return errors.New("user exists")
	}
	err = dao.DB.Create(&user).Error
	return nil
}

// GetUser 获取一个用户信息
func GetUser(user *User) (err error) {
	var userDB User
	err = dao.DB.Debug().Where("user_name=?", user.UserName).First(&userDB).Error
	// 如果不存在该用户
	if userDB.UserId == 0 {
		return errors.New("user not found")
	}
	// 如果密码输入不正确
	if userDB.Password != user.Password {
		// 重新定义错误
		return errors.New("incorrect password")
	}
	// 如果没有问题，正常返回即可
	*user = userDB
	return nil
}
