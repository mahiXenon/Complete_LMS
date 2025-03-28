package handlers

import (
	"fmt"
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// SeeRequest godoc
// @Summary See all requests
// @Description Get all requests for the library managed by the admin
// @Tags requests
// @Accept  json
// @Produce  json
// @Param Authorization header string true "Bearer token"
// @Success 200 {object} []models.RequestEvent
// @Failure 400 {object} string
// @Router /admin/see-request [get]
// @Security BearerAuth
func SeeRequest(c *gin.Context) {

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
		var listRequest []models.RequestEvent
		database.DB.Model(&models.RequestEvent{}).Where("library_id = ?", library.LibraryId).Find(&listRequest)
		if len(listRequest) == 0 {
			c.JSON(http.StatusOK, gin.H{"data": listRequest})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": listRequest})

	}
}
