package models

// User 定义用户结构体
// 结构体中，首字母大写相当于public，首字母小写相当于private(相对于包来说)
type User struct {
	// 添加Json渲染
	UserName string `json:"userName"`
	Password string `json:"password"`
}
