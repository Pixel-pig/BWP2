package controllers

import (
	"BWP/models/rpc"
	"BWP/utils/rpcUtils"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
)

type RpcMethodController struct {
	beego.Controller
}

func (r *RpcMethodController) Post() {
	RpcJson := rpc.RpsJson{}
	if err := json.Unmarshal(r.Ctx.Input.RequestBody,&RpcJson); err != nil {
		fmt.Println(err.Error())
		return
	}
	RPCResult := rpcUtils.PRCMCTR(RpcJson.Method, RpcJson.Params)
	RPCResultByte, _ := json.Marshal(RPCResult)
	r.Data["json"] = string(RPCResultByte)
	r.ServeJSON()
}
