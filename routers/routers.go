package routers

import (
	"gin_learn/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	// 注册测试路由
	r.GET("/", controller.IndexHandler)

	// 注册用户相关的注册、登录、注销的路由
	UserGroup := r.Group("user")
	{
		// 用户登录的路由
		UserGroup.POST("/login", controller.UserLoginHandler)
		// 用户注册的路由
		UserGroup.POST("/register", controller.UserRegisHandler)
	}
	return r
}
