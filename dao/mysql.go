package dao

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	DB            *gorm.DB
	MySQLUser     string
	MySQLPassword string
	MySQLHost     string
	MySQLPort     int
	MySQLDb       string
)

func InitMySQL() (err error) {
	MySQLUser = "root"
	MySQLPassword = "123456"
	MySQLPort = 3306
	MySQLHost = "localhost"
	MySQLDb = "gin_blog"
	// 首先配置数据库连接设置
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		MySQLUser, MySQLPassword, MySQLHost, MySQLPort, MySQLDb)
	// 连接数据库
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("err :%v\n", err)
		return
	}
	// 返回数据库连接信息
	return DB.DB().Ping()
}

func Close() {
	err := DB.Close()
	if err != nil {
		return
	}
}
