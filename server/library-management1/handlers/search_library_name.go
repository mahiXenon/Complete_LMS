package handlers

import (
	"fmt"
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SearchLibraryName(c *gin.Context) {
	q := c.Query("searchlib")
	var allLibrary []models.Library
	// fmt.Println(q)
	// search := c.Query(q)
	// fmt.Println(search)
	user, _ := c.Get("currentUser")
	userData := user.(models.User)
	// var library models.LibraryUser
	// database.DB.Where("name = ?", allLibrary.Name).Find(&library)

	fmt.Println(q)
	// database.DB.Model(&models.LibraryUser{}).Where("user_id = ?", userData.ID).Find(&library)
	// database.DB.Model(&models.Library{}).
	// 	Where("name NOT IN (?)", database.DB.Model(&models.Library{}).
	// 		Select("libraries.name").
	// 		Joins("join library_users on library_users.library_id = libraries.id").
	// 		Where("library_users.user_id = ?", userData.ID).
	// 		Where("libraries.name ILIKE ?", "%"+q+"%").SubQuery()).
	// 	Find(&allLibrary)
	if q == "" {
		database.DB.Model(&models.Library{}).
			Where("name NOT IN (?)", database.DB.Table("library_users as lb").
				Select("l.name").
				Joins("join libraries as l on lb.library_id = l.id").
				Where("lb.user_id = ?", userData.ID).
				SubQuery()).
			Find(&allLibrary)
		c.JSON(http.StatusOK, gin.H{"data": allLibrary})
		return
	}

	database.DB.Model(&models.Library{}).
		Where("name NOT IN (?)", database.DB.Table("library_users as lb").
			Select("l.name").
			Joins("join libraries as l on lb.library_id = l.id").
			Where("lb.user_id = ?", userData.ID).
			SubQuery()).Where("name ILIKE ?", "%"+q+"%").
		Find(&allLibrary)

	c.JSON(http.StatusOK, gin.H{"data": allLibrary})
}
