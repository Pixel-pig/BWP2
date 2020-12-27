package user

import (
	"BWP/db_mysql"
	"BWP/utils/cryp"
)

type User struct {
	Uid      int64 //uid自动生成
	Phone    string `form:"phone"`
	Username string `form:"user"`
	Password string `form:"password"`
}

//将数据存入数据库中
//----------------------------------后期加入UID自动生成的函数----------------------------------
func (u *User) SaveUserInfo() (int64, error) {
	u.Password = cryp.MD5HashString(u.Password)
	result, err := db_mysql.DB.Exec("insert into user "+
		"(phone, pwd, username)"+
		"values (?, ?, ?)", u.Phone, u.Password, u.Username)
	if err != nil {
		return -1, err
	}
	return result.RowsAffected()
}

//从数据库中查询数据
func (u *User) QuaryUserInfo() (*User, error) {
	u.Password = cryp.MD5HashString(u.Password)
	row := db_mysql.DB.QueryRow("select username from user where phone = ? and pwd = ?",
		u.Phone, u.Password)
	if err := row.Scan(&u.Username); err != nil {
		return nil, err
	}
	return u, nil
}
