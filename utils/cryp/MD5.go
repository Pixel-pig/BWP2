package cryp

import (
	"crypto/md5"
	"encoding/hex"
)

//将数据进行MD5hash
func MD5HashString(data string) string {
	md5hash := md5.New()
	md5hash.Write([]byte(data))
	hashBytes := md5hash.Sum(nil)
	return hex.EncodeToString(hashBytes)
}
