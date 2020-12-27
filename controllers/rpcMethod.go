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

	temp := []string{}
	//对params中不同数据进行分类
	for i := 0; i < len(RpcJson.Params) ; i++ {
		temp[i] = RpcJson.Params[i].(string)
	}
	fmt.Println(temp)
	rpcJson := rpcUtils.RPCToJSON(RpcJson.Method, temp)
	RPCResult := rpcUtils.DoPost(rpcJson)
	fmt.Println(RPCResult)
	r.Ctx.WriteString("chengon")
}