package controllers

import (
	user2 "BWP/models/user"
	"fmt"
	"github.com/astaxie/beego"
)

type RegisterController struct {
	beego.Controller
}

func (r *RegisterController) Post ()  {
	users := user2.User{}
	if err := r.ParseForm(&users); err != nil {
		r.Ctx.WriteString("你输入的数据有误!")
		return
	}
	fmt.Println(users.Phone)
	fmt.Println(users.Username)
	fmt.Println(users.Password)
	_, err := users.SaveUserInfo()
	if err != nil {
		r.Ctx.WriteString("用户注册失败!")
		return
	}
	r.TplName = "index.html"
}