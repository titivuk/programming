package main

import "fmt"

func run(ch chan int, start int) chan int {
	defer close(ch)

	for i := start; i < start+10; i++ {
		ch <- i
	}

	return ch
}

func main() {
	ch1 := make(chan int, 10)
	ch2 := make(chan int, 10)

	go run(ch1, 1)
	go run(ch2, 11)

	count := 2
	for count != 0 {
		select {
		case v, ok := <-ch1:
			if !ok {
				count--
				ch1 = nil
				break
			}
			fmt.Printf("goroutine #1 sent value %d\n", v)
		case v, ok := <-ch2:
			if !ok {
				count--
				ch2 = nil
				break
			}
			fmt.Printf("goroutine #2 sent value %d\n", v)
		}
	}
}
