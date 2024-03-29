package toolkit

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// 设置密钥
var jwtKey = []byte("secret_key")

// Claims 是一个结构体，继承jwt.StandardClaims
type Claims struct {
	UserId int `json:"userName"`
	jwt.StandardClaims
}

// GenerateJWT 生成JWT令牌
func GenerateJWT(userId int) (string, error) {
	// 设置令牌过期时间
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserId: userId,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// 对身份信息进行加密
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	return tokenString, err
}

// TokenAuthMiddleware 设置中间件验证请求头中的令牌
func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取验证请求头中的信息
		tokenString := c.GetHeader("Authorization")

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		// 如果有错误或者token无效
		if err != nil || !token.Valid {
			c.JSON(http.StatusOK, gin.H{
				"err": "Invalid token",
			})
			c.Abort()
			return
		}
		fmt.Printf("Auth验证成功")

		c.Set("userId", claims.UserId)
		c.Next()
	}
}
