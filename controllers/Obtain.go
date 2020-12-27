package controllers

import "github.com/astaxie/beego"

type ObtainController struct {
	beego.Controller
}

func (o *ObtainController) Get() {
	o.TplName = "obtain.html"
}
