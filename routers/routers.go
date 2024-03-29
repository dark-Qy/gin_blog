package routers

import (
	"gin_learn/controller"
	"gin_learn/toolkit"
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
		// 用户注销的路由
		UserGroup.DELETE("/logout", controller.UserLogoutHandler)
	}

	// 注册博客相关的新建、修改、删除的路由
	// 同时使用验证中间件来验证身份
	BlogGroup := r.Group("blog").Use(toolkit.TokenAuthMiddleware())
	{
		// 新建博客的路由
		BlogGroup.POST("/create", controller.BlogCreateHandler)
		// 更新博客的路由
		BlogGroup.POST("/update", controller.BlogUpdateHandler)
		// 删除博客的路由
		BlogGroup.DELETE("/delete", controller.BlogDeleteHandler)
		// 查看所有博客的路由
		BlogGroup.GET("/list", controller.BlogGetAllHandler)
		// 查看单个博客的路由
		BlogGroup.GET("/list/id=:id", controller.BlogGetAHandler)
	}
	return r
}
