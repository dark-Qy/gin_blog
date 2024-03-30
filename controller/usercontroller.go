package controller

import (
	"gin_learn/models"
	"gin_learn/toolkit"
	"github.com/gin-gonic/gin"
	"net/http"
)

// UserRegisHandler 用户注册控制器
func UserRegisHandler(c *gin.Context) {
	// 根据Json信息绑定结构体
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		return
	}

	// 创建对应用户信息
	err = models.CreateUser(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 1001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "userName": user.UserName})
	}
}

// UserLoginHandler 用户登录控制器
func UserLoginHandler(c *gin.Context) {
	// 根据Json信息绑定结构体
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		return
	}

	// 查询对应用户信息
	err = models.GetUser(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 1001, "error": err.Error()})
	}

	// 用户认证成功，生成JWT
	token, err := toolkit.GenerateJWT(user.UserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": 1002,
			"error":  "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   0,
		"userName": user.UserName,
		"token":    token,
	})

}

// UserLogoutHandler  用户注销控制器
func UserLogoutHandler(c *gin.Context) {
	// 根据Json信息绑定结构体
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		return
	}

	// 删除对应用户
	err = models.DelUser(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 1001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "userName": user.UserName})
	}
}
