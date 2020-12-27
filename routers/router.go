package routers

import (
	"BWP/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	//注册
	beego.Router("/register", &controllers.RegisterController{})
	//登入
	beego.Router("/login",&controllers.LoginController{})
	////注册页面
	//beego.Router("/index.html",&controllers.Index{})
	//方法页面
	beego.Router("/Btc_home.html",&controllers.Btc_homeController{})
	//功能页面
	beego.Router("/obtain.html",&controllers.ObtainController{})
	//rpcServer调用方法
	beego.Router("/obtain",&controllers.RpcMethodController{})
}
