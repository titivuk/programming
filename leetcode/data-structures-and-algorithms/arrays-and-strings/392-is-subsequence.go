package main

func isSubsequence(s string, t string) bool {
	sLen := len(s)
	tLen := len(t)

	sIdx := 0
	tIdx := 0
	for sIdx < sLen && tIdx < tLen {
		if t[tIdx] == s[sIdx] {
			sIdx++
		}

		tIdx++
	}

	return sIdx == sLen
}
