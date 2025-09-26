package main

import (
	"bytes"
)

func mergeAlternately(word1 string, word2 string) string {
	l1 := len(word1)
	l2 := len(word2)

	var buf bytes.Buffer
	i := 0
	for i < l1 && i < l2 {
		buf.WriteByte(word1[i])
		buf.WriteByte(word2[i])

		i++
	}

	if i < l1 {
		buf.WriteString(word1[i:])
	} else if i < l2 {
		buf.WriteString(word2[i:])
	}

	return buf.String()
}
