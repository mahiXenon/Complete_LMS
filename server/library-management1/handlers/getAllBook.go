package handlers

import (
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary Get all books
// @Description Get all books in the library
// @Tags books
// @Accept json
// @Produce json
// @Param Authorization header string true "Bearer token"
// @Success 200 {object} []models.BookInventory
// @Failure 400 {object} string
// @Router /book/all [get]
// @Security BearerAuth
func GetAllBook(c *gin.Context) {
	var allBooks []models.BookInventory

	if err := database.DB.Find(&allBooks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, _ := c.Get("currentUser")
	userData := user.(models.User)
	var library models.LibraryUser
	database.DB.Where("user_id = ?", userData.ID).Find(&library)

	if library.LibraryId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "You have not registered in any library yet"})
		return
	}
	database.DB.Model(&models.BookInventory{}).
		Where("library_id  IN (?)", database.DB.Model(&models.LibraryUser{}).Select("library_id").Where("user_id = ?", userData.ID).SubQuery()).
		Find(&allBooks)

	c.JSON(http.StatusOK, gin.H{"data": allBooks})
}
