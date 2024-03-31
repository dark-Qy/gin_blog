package controller

import (
	"fmt"
	"gin_learn/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func CommentAddHandler(c *gin.Context) {
	var comment models.Comment
	err := c.BindJSON(&comment)
	fmt.Printf("blog_id is %v, content is %v,userName is %v", comment.UserName, comment.BlogID, comment.Content)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 3001, "error": err.Error()})
		return
	}
	err = models.CreateComment(&comment)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 3001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": 0})
	}
}

func CommentGetHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")
	if !ok {
		c.JSON(http.StatusOK, gin.H{"status": 2001, "error": "invalid id"})
	}
	idiot, _ := strconv.Atoi(id)
	var commentList []models.Comment
	err := models.GetComment(idiot, &commentList)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"status": 3001, "error": err.Error()})
	} else {
		c.JSON(http.StatusOK, commentList)
	}
}
