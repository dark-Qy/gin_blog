package controller

import (
	"gin_learn/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

// UserRegisHandler 用户注册控制器
func UserRegisHandler(c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		return
	}

	err = models.CreateUser(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 1001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "user": user})
	}
}

// UserLoginHandler 用户登录控制器
func UserLoginHandler(c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		return
	}

	err = models.GetUser(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 1001, "error": err.Error()})
	} else {
		println(user)
		c.JSON(http.StatusOK, gin.H{"status": 0, "user": user})
	}
}
