package rpc

//存储rpc-json规范的结构体
type RpsJson struct {
	Id      int64         `json:"id"`
	Rpcjson string        `json:"rpcjson"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
}
