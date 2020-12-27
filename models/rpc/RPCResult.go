package rpc

//自定义的结构体，用于描述RPC比特币客户端返回的结果
type RPCResult struct {
	Code int        `json:"code"`
	Msg  string     `json:"msg"`
	Data Resultdata `json:"data"`
}
