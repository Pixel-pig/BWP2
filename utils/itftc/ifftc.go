package itftc

import "strconv"

func InterfaceTypeClassification(a []interface{}) []interface{} {
	temp := make([]interface{}, len(a)-1)
	for i := 0; i < len(a); i++ {
		str := a[i].(string)
		if j, err := strconv.Atoi(str); err == nil {
			//为数字时
			temp = append(temp, j)
		} else {
			//为字符串时
			temp = append(temp, str)
		}
	}
	return temp
}
