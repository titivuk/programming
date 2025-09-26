package main

import (
	"context"
	"fmt"
	"math/rand"
	"time"
)

func main() {
	ctx, cancelFunc := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancelFunc()

	i := 0
	sum := 0
	for {
		// if err := context.Cause(ctx); err != nil {
		// 	fmt.Printf("sum: %d. iterations: %d. reason: %s\n", sum, i, ctx.Err())
		// 	break
		// }
		// another approach is to use <- ctx.Done()
		select {
		case <-ctx.Done():
			fmt.Printf("sum: %d. iterations: %d. reason: %s\n", sum, i, ctx.Err())
			return
		default:
		}

		sum += rand.Intn(100_000_000)
		// delta to test positive case
		// sum += rand.Intn(2)
		i++

		if sum == 1234 {
			fmt.Printf("sum: %d. iterations: %d. reason: number reached\n", sum, i)
			return
		}
	}
}
