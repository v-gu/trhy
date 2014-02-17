package models

import (
	"bytes"
	"database/sql"
	"strconv"

	"github.com/coopernurse/gorp"
	_ "github.com/go-sql-driver/mysql"
	"github.com/robfig/revel"
	"github.com/robfig/revel/modules/db/app"
)

var (
	Dbm *gorp.DbMap
)

func InitGorp() {
	// init revel db module
	db.Init()

	// construct a gorp DbMap
	dialect := gorp.MySQLDialect{Engine: "InnoDB", Encoding: "UTF8"}
	Dbm = &gorp.DbMap{Db: db.Db, Dialect: dialect}

	// bind tables
	// Dbm.AddTableWithName(User{}, "users").SetKeys(true, "Id")
	Dbm.AddTableWithName(Artist{}, "artists").SetKeys(true, "Id")
	// Dbm.AddTableWithName(Album{}, "albums").SetKeys(true, "Id")
	// Dbm.AddTableWithName(Work{}, "works").SetKeys(true, "Id")
	// Dbm.AddTableWithName(Client{}, "clients").SetKeys(true, "Id")
	// Dbm.AddTableWithName(Transaction{}, "transactions").SetKeys(true, "Id")
	// Dbm.AddTableWithName(Price{}, "prices").SetKeys(false, "Transaction_id", "Type")
	// Dbm.AddTableWithName(Deal{}, "deals").SetKeys(false, "Transaction_id", "Client_id")

	Dbm.TraceOn("[gorp]", revel.TRACE)
}

type GorpTransaction struct {
	Txn *gorp.Transaction
}

func (c *GorpTransaction) Begin() revel.Result {
	txn, err := Dbm.Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

func (c *GorpTransaction) Commit() revel.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Commit(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c *GorpTransaction) Rollback() revel.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Rollback(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func ComposeSQL(tableFields map[string]string, params map[string]string,
	limit, offset int) string {
	if tableFields == nil || len(tableFields) == 0 {
		panic("require at least one fields to select!")
	}

	var (
		buffer bytes.Buffer
		i      int // loop counter
	)

	// compose SELECT fields
	if _, ok := tableFields["*"]; ok {
		buffer.WriteString("SELECT *")
	} else {
		i = 0
		for table, field := range tableFields {
			if i == 0 {
				buffer.WriteString("SELECT " + field)
			} else {
				buffer.WriteString("," + table + "." + field)
			}
			i++
		}
	}
	// compose tables
	i = 0
	for table, _ := range tableFields {
		if i == 0 {
			buffer.WriteString(" FROM " + table)
		} else {
			buffer.WriteString("," + table)
		}
		i++
	}
	// compose WHERE conditions
	i = 0
	for name, value := range params {
		if value == "" {
			continue
		}
		if i == 0 {
			buffer.WriteString(" WHERE " + name + value)
		} else {
			buffer.WriteString(" AND " + name + value)
		}
		i++
	}
	// compose LIMIT OFFSET
	if limit > 0 {
		buffer.WriteString(" LIMIT " + strconv.Itoa(limit))
	}
	if offset > 0 {
		buffer.WriteString(" OFFSET " + strconv.Itoa(offset))
	}

	return buffer.String()
}
