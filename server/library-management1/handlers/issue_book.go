package handlers

import (
	"fmt"
	"net/http"

	"library-management1/database"
	"library-management1/models"

	// "library-management1/models"

	"github.com/gin-gonic/gin"
)

func IssueBook(c *gin.Context) {
	user, _ := c.Get("currentUser")
	userData := user.(models.User)
	if userData.Role != "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Only admin can see all request"})
		return
	}
	if userData.Role == "admin" {
		var library models.LibraryUser
		// finding the library id of user admin
		database.DB.Where("user_id = ?", userData.ID).Find(&library)
		fmt.Println("lib", library.LibraryId)
		// finding all request of library
		var issue []models.IssueBook
		database.DB.Model(&models.IssueBook{}).Where("library_id = ?", library.LibraryId).Find(&issue)
		if len(issue) == 0 {
			c.JSON(http.StatusOK, gin.H{"data": issue})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": issue})
	}
}
