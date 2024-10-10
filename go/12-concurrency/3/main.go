package main

import (
	"fmt"
	"math"
	"sync"
)

var cachedMap = sync.OnceValue(func() map[int]float64 {
	fmt.Println("create map function invocation")

	m := make(map[int]float64)

	for i := 0; i < 100_000; i++ {
		m[i] = math.Sqrt(float64(i))
	}

	return m
})

func main() {
	var m map[int]float64

	for i := 0; i < 100_000; i = (i + 1) * 4 {
		m = cachedMap()
		fmt.Printf("square root of %d is %f\n", i, m[i])
	}
}
