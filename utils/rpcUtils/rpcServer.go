//rpc的连接规范及连接，命令的调用包

package rpcUtils

import (
	"BWP/models/rpc"
	"BWP/utils/itftc"
	"encoding/json"
	"github.com/astaxie/beego"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"
)

/**
 * 启用BTCrpc服务获取一个RPCResult对象
 *
 *@param method bitcoin的调用方法
 *@param params 调用方法时携带的参数
 */
func PRCMCTR(method string ,params []interface{}) rpc.RPCResult{
	//判断该命令是否有参数
	if params == nil {
		jsondata := RPCToJSONNP(method)
		return DoPost(jsondata)
	}else {
		t := itftc.InterfaceTypeClassification(params)
		jsondata := RPCToJSONHP(method,t)
		return DoPost(jsondata)
	}
}

/**
 * JSON-RPC规范
 *
 *@param method bitcoin的调用方法
 *@param params 调用方法时携带的参数，可以不填
 *@return 返回的json数据作为请求主体
 */
func RPCToJSON(method string, params []interface{}) string {
	conf := beego.AppConfig

	rpcjson := rpc.RpsJson{
		Id:      time.Now().Unix(),
		Rpcjson: conf.String("rpcjson"),
		Method:  method,
		Params:  params,
	}
	rpcjsonbyte, err := json.Marshal(rpcjson)
	if err != nil {
		log.Fatal("JSON-RPC规范错误", err.Error())
	}
	return string(rpcjsonbyte)
}
//有参数
func RPCToJSONHP(method string, params []interface{}) string {
	return RPCToJSON(method, params)
}
//无参数
func RPCToJSONNP(method string, params ...interface{}) string {
	return RPCToJSON(method, params)
}


//构建post请求
//rpc_json为rpc_json规范的数据
//返回rpc请求的结果
func DoPost(rpc_json string) rpc.RPCResult {
	client := &http.Client{}
	conf := beego.AppConfig
	rpcconnect := conf.String("rpcconnect")
	rpcport := conf.String("rpcport")
	url := "http://" + rpcconnect + ":" + rpcport

	//构造post请求（将规范填入，第三个参数可以为空）
	req, err := http.NewRequest("POST", url, strings.NewReader(rpc_json))
	if err != nil {
		log.Fatal("构造post请求错误" + err.Error())
	}

	//设置请求头
	headers := addHeader()
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	req.SetBasicAuth(conf.String("rpcuser"), conf.String("rpcpassword"))

	//执行请求
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("post响应错误" + err.Error())
	}
	defer resp.Body.Close()

	//获取请求体
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("读取请求体错误" + err.Error())
	}

	//将数据到入到结构体中
	RPCResult := rpc.RPCResult{}
	Resultdata := rpc.Resultdata{}
	code := resp.StatusCode
	if code == http.StatusOK {
		RPCResult.Msg = "请求成功"
	} else {
		RPCResult.Msg = "请求失败"
	}
	RPCResult.Code = code
	if err := json.Unmarshal(body, &Resultdata); err != nil {
		log.Fatal("json解析错误" + err.Error())
	}
	RPCResult.Data = Resultdata
	return RPCResult
}

//设置请求体
func addHeader() map[string]string {
	header := make(map[string]string, 3)
	header["Content-type"] = "application/json"
	header["Encoding"] = "UTF-8"
	return header
}
