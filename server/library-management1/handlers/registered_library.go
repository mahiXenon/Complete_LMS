package handlers

import (
	"fmt"
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterdLibrary(c *gin.Context) {
	user, _ := c.Get("currentUser")
	// user, _ := c.Get("currentUser")
	userData := user.(models.User)
	// userData := user.(models.User)
	var library []models.Library
	// database.DB.Model(&models.LibraryUser{}).Where("user_id = ?", userData.ID).Find(&library)
	database.DB.Table("library_users as lb").
		Select("l.name").
		Joins("join libraries as l on lb.library_id = l.id").
		Where("lb.user_id = ?", userData.ID).
		Find(&library)
	c.JSON(http.StatusOK, gin.H{"data": library})
	fmt.Println(userData.Name)
}
