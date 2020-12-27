package db_mysql

import (
	"database/sql"
	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
)

//db对象全局变量
var DB *sql.DB

/**
 * 打开数据库
 */
func OpenDB() error {
	//1.判断是否已经连接
	//if DB != nil {
	//	return errors.New("数据库已连接")
	//}
	//2.从配置文件中获取数据库配置
	conf := beego.AppConfig
	driver := conf.String("db_driver")
	opensql := conf.String("db_user") + ":" + conf.String("db_password") +
		"@tcp(" + conf.String("db_ip") + ")/" + conf.String("db_name") + "?charset=utf8"
	//3.打开数据库连接
	database, err := sql.Open(driver, opensql)
	if err != nil {
		return err
	}
	DB = database
	return nil
}

/**
 * 关闭数据库连接
 */

func CloneDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
