package handlers

import (
	"fmt"
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SearchReturn(c *gin.Context) {
	user, _ := c.Get("currentUser")
	userData := user.(models.User)

	var returnBook []models.BookInventory
	var targetLibrary []models.Library

	subQuery := database.DB.
		Table("library_users").
		Select("library_id").
		Where("user_id = ?", userData.ID)

	// Main query to fetch libraries where the user is registered
	database.DB.
		Model(&models.Library{}).
		Where("id IN (?)", subQuery.SubQuery()).
		Find(&targetLibrary)

	// Extract library IDs from targetLibrary
	var libraryIDs []int
	for _, lib := range targetLibrary {
		libraryIDs = append(libraryIDs, int(lib.ID))
	}
	fmt.Println(libraryIDs)
	database.DB.
		Model(&models.BookInventory{}).
		Joins("JOIN request_events ON request_events.isbn = book_inventories.isbn").
		Where("request_events.user_id = ?", userData.ID).
		Where("request_events.request_action = ?", "Book Granted").
		Where("request_events.request_type = ?", "borrow").
		Where("book_inventories.library_id IN (?)", libraryIDs). // Filter by multiple library IDs
		Find(&returnBook)

	c.JSON(http.StatusOK, gin.H{"data": returnBook})
}
