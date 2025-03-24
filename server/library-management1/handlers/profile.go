package handlers

import (
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Profile(c *gin.Context) {
	user, _ := c.Get("currentUser")
	userData1 := user.(models.User)

	var users models.User
	database.DB.Where("id = ?", userData1.ID).Find(&users)
	if users.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "no user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
