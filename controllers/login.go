package controllers

import (
	user2 "BWP/models/user"
	"fmt"
	"github.com/astaxie/beego"
)

type LoginController struct {
	beego.Controller
}

func (l *LoginController) Post ()  {
	users := user2.User{}
	if err := l.ParseForm(&users); err != nil {
		l.Ctx.WriteString("用户名或密码错误!")
		return
	}
	user, err := users.QuaryUserInfo()
	if err != nil {
		fmt.Println(err)
		l.Ctx.WriteString("用户登录失败!")
	}
	fmt.Println(user)
	l.TplName = "Btc_home.html"
}