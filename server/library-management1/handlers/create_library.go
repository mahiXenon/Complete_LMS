package handlers

import (
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CreateLibrary handles the creation of a new library.
func CreateLibrary(c *gin.Context) {
	type CreateAndAssign struct {
		Name  string `json:"name" binding:"required"`
		Email string `json:"email" binding:"required"`
	}

	var giveLibrary CreateAndAssign
	if err := c.ShouldBindJSON(&giveLibrary); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the library already exists
	var existingLibrary models.Library
	if database.DB.Where("name = ?", giveLibrary.Name).First(&existingLibrary); existingLibrary.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Library already exists"})
		return
	}

	// Check if the user exists
	var user models.User
	if database.DB.Where("email = ?", giveLibrary.Email).First(&user); user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
		return
	}

	// Get the current user
	currentUser, _ := c.Get("currentUser")
	currentUserData := currentUser.(models.User)

	// Ensure current user is not already associated with a library
	var userLibrary models.LibraryUser
	database.DB.Where("user_id = ?", currentUserData.ID).First(&userLibrary)

	// Check if the user is an admin
	if user.Role == "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Admin can't create a library"})
		return
	}

	// Create new library
	newLibrary := models.Library{Name: giveLibrary.Name}
	database.DB.Create(&newLibrary)

	// Update current user role to Owner
	currentUserData.Role = "Owner"
	database.DB.Model(&models.User{}).Where("id = ?", currentUserData.ID).Update("Role", "Owner")

	// Link user to the new library
	database.DB.Create(&models.LibraryUser{
		UserId:    currentUserData.ID,
		LibraryId: newLibrary.ID,
	})

	// Assign the provided user as admin
	database.DB.Model(&models.User{}).Where("id = ?", user.ID).Update("Role", "admin")
	database.DB.Create(&models.LibraryUser{
		UserId:    user.ID,
		LibraryId: newLibrary.ID,
	})

	c.JSON(http.StatusOK, gin.H{"message": "Library created and admin assigned successfully"})
}
