package handlers

import (
	"library-management1/database"
	"library-management1/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SearchLibrary(c *gin.Context) {

	var AuthLibrary models.AuthLibrary
	if err := c.ShouldBindJSON(&AuthLibrary); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var check models.Library
	database.DB.Model(&models.Library{}).Where("name = ?", AuthLibrary.Name).Find(&check)
	if check.ID == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Library not found"})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"error": "Library found"})

}
