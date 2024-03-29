package controller

import (
	"gin_learn/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

// BlogCreateHandler 新建博客控制器
func BlogCreateHandler(c *gin.Context) {
	var blog models.Blog
	err := c.ShouldBind(&blog)
	if err != nil {
		println(err.Error())
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
	var blog models.Blog
	err := c.ShouldBind(&blog)
	if err != nil {
		println(err.Error())
		return
	}
}

// BlogDeleteHandler  删除博客控制器
func BlogDeleteHandler(c *gin.Context) {
	var blog models.Blog
	err := c.ShouldBind(&blog)
	if err != nil {
		println(err.Error())
		return
	}
}

// BlogGetAllHandler  查看所有博客
func BlogGetAllHandler(c *gin.Context) {
	var blogList []models.Blog
	// 从数据库中读取所有博客
	err := models.GetAllBlog(&blogList)
	if err != nil {
		println(err.Error())
		return
	} else {
		c.JSON(http.StatusOK, blogList)
	}
}

// BlogGetAHandler  查看单个博客
func BlogGetAHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 0, "error": "invalid id"})
	}
	idiot, err := strconv.Atoi(id)
	// 从数据库中读取所有博客
	blog, err := models.GetABlog(idiot)
	if err != nil {
		println(err.Error())
		return
	} else {
		c.JSON(http.StatusOK, blog)
	}
}
