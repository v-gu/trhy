package controllers

import (
	"fmt"

	"github.com/v-gu/art_trhy/app/models"

	"github.com/robfig/revel"
	// "github.com/robfig/revel/modules/db/app"
)

type Inventory struct {
	*revel.Controller
	models.GorpTransaction
}

func (c Inventory) Index() revel.Result {
	return c.Render()
}

func (c Inventory) QueryArtists(page, start, limit int) revel.Result {
	var hasError bool
	var errString string

	sql := "SELECT count(*) FROM artists"
	count, err := models.Dbm.SelectInt(sql)
	if err != nil {
		json := &JsonResult{
			Rows:    nil,
			Total:   count,
			Success: false,
			Message: err.Error(),
		}
		return c.RenderJson(json)
	}

	sql = fmt.Sprintf("SELECT * FROM artists limit %v offset %v", limit, start)
	artists, err := models.Dbm.Select(models.Artist{}, sql)
	if err != nil {
		hasError = true
		errString = err.Error()
	}

	json := &JsonResult{
		Rows:    artists,
		Total:   count,
		Success: !hasError,
		Message: errString,
	}
	return c.RenderJson(json)
}

func (c Inventory) Albums() revel.Result {
	return c.Render()
}

// func (c Inventory) QueryAlbums(start, limit, pageIndex int, name, author string) revel.Result {
// 	tableFields := map[string]string{"albums": "*"}
// 	params := map[string]string{
// 		"name like ":   "'%" + name + "%'",
// 		"author like ": "'%" + author + "%'",
// 	}
// 	sql := models.ComposeSQL(tableFields, params, limit, start)

// 	var hasError bool
// 	var errString string
// 	albums, err := models.Dbm.Select(models.Album{}, sql)
// 	if err != nil {
// 		hasError = true
// 		errString = err.Error()
// 	}

// 	// marshal json output
// 	json := &JsonResult{
// 		Rows:    albums,
// 		Total:   len(albums),
// 		Success: !hasError,
// 		Message: errString,
// 	}

// 	return c.RenderJson(json)
// 	// return c.Render()
// }

func (c Inventory) Artists() revel.Result {
	return c.Render()
}

type JsonResult struct {
	Rows    []interface{} `json:"rows"`
	Total   int64         `json:"total"`
	Success bool          `json:"success"`
	Message string        `json:"message"`
}
