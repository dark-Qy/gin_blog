package controller

import (
	"gin_learn/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

// BlogCreateHandler 新建博客控制器
func BlogCreateHandler(c *gin.Context) {
	var blog models.Blog
	err := c.ShouldBind(&blog)
	if err != nil {
		println(err.Error() + "?")
		return
	}
	err = models.CreateBlog(&blog)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "blogTitle": blog.BlogTitle})
	}
}

// BlogUpdateHandler 更新博客控制器
func BlogUpdateHandler(c *gin.Context) {
	var Blog models.Blog
	err := c.BindJSON(&Blog)
	if err != nil {
		return
	}
	return
}

// BlogDeleteHandler  删除博客控制器
func BlogDeleteHandler(c *gin.Context) {
	var Blog models.Blog
	err := c.BindJSON(&Blog)
	if err != nil {
		return
	}
	return
}
