package controllers

import "github.com/astaxie/beego"

type Btc_homeController struct {
	beego.Controller
}


func (b *Btc_homeController) Get() {
	b.TplName = "Btc_home.html"
}