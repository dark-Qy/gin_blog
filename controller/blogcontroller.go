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
		c.JSON(http.StatusOK, gin.H{"status": 0, "blogId": blog.BlogId})
	}
}

// BlogUpdateHandler 更新博客控制器
func BlogUpdateHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": "invalid id "})
	}
	idiot, _ := strconv.Atoi(id)
	var blog models.Blog
	err := c.ShouldBind(&blog)
	if err != nil {
		println(err.Error())
		return
	}
	err = models.UpdateBlog(idiot, &blog)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "blogTitle": blog.BlogTitle})
	}
}

// BlogDeleteHandler  删除博客控制器
func BlogDeleteHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": "invalid id "})
	}
	idiot, _ := strconv.Atoi(id)
	err := models.DelBlog(idiot)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0})
	}
}

// BlogGetAllHandler  查看所有博客
func BlogGetAllHandler(c *gin.Context) {
	var blogList []models.Blog
	// 从数据库中读取所有博客
	err := models.GetAllBlog(&blogList)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "blogList": blogList})
	}
}

// BlogGetAHandler  查看单个博客
func BlogGetAHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": "invalid id"})
	}
	idiot, _ := strconv.Atoi(id)
	// 从数据库中读取所有博客
	blog, err := models.GetABlog(idiot)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, blog)
	}
}

func BlogSearchHandler(c *gin.Context) {
	query, ok := c.Params.Get("query")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": "invalid query"})
	}
	blogList, err := models.SearchBlog(query)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0, "blogList": blogList})
	}
}
