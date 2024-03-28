/*
* name:yqin@
* func:程序的主函数
* date:
 */
package main

import (
	"fmt"
	"gin_learn/controller"
	"gin_learn/dao"
	"gin_learn/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "Hello")
	if err != nil {
		return
	}
}

func main() {
	// 启动gin服务
	r := gin.Default()

	// 连接数据库
	err := dao.InitMySQL()
	if err != nil {
		fmt.Printf("init mysql failed,err:%v\n", err)
		return
	}
	// 根据模型创建数据库表项
	dao.DB.AutoMigrate(&models.User{})
	dao.DB.AutoMigrate(&models.Comment{})
	dao.DB.AutoMigrate(&models.Blog{})

	// 默认主页界面
	r.GET("/hello", controller.IndexHandler)

	// 在指定端口上启动web服务
	err = r.Run(":18080")
	if err != nil {
		return
	}
}
