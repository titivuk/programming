package main

func romanToInt(s string) int {
	mapping := map[byte]int{
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	}

	var curInt int
	result := 0
	l := len(s)
	for i := 0; i < l; i++ {
		curInt = mapping[s[i]]

		if i+1 < l && curInt < mapping[s[i+1]] {
			result -= curInt
		} else {
			result += curInt
		}
	}

	return result
}
