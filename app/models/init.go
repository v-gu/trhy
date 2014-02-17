package models

import (
	"github.com/robfig/revel"
)

func init() {
	revel.OnAppStart(InitGorp)
}
