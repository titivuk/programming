package main

func longestCommonPrefix(strs []string) string {
	i := 0
	for i < len(strs[0]) {
		expectedCh := strs[0][i]

		for _, s := range strs {
			if len(s) <= i || s[i] != expectedCh {
				return strs[0][:i]
			}
		}

		i++
	}

	// loop did not return -> every char from strs[0] is part of prefix
	// prefix cannot be longer than strs[0], bcs otherwise it cannot be prefix of strs[0]
	// so strs[0] is answer
	return strs[0]
}
