package main

import (
	"BWP/db_mysql"
	_ "BWP/routers"
	"github.com/astaxie/beego"
	"log"
)

func main() {
	//打开数据库连接
	if err := db_mysql.OpenDB(); err != nil {
		log.Fatal(err.Error())
	}
	defer db_mysql.CloneDB()

	//加载静态资源
	beego.SetStaticPath("/img","./static/img")
	beego.SetStaticPath("/css","./static/css")
	beego.SetStaticPath("/js","./static/js")

	beego.Run()
}

