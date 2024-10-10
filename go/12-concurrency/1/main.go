package main

import (
	"fmt"
	"sync"
)

/*
1. Create a function that launches three goroutines that communicate using a channel.
The first two goroutines each write 10 numbers to the channel.
The third goroutine reads all the numbers from the channel and prints them out.
The function should exit when all values have been printed out.
Make sure that none of the goroutines leak.
You can create additional goroutines, if needed.
*/
func main() {
	var writerWg sync.WaitGroup
	ch := make(chan int, 20)

	writer := func(start int) {
		defer writerWg.Done()

		for i := start; i < start+10; i++ {
			ch <- i
		}
	}

	go func() {
		writerWg.Wait()
		close(ch)
	}()

	writerWg.Add(2)
	go writer(1)
	go writer(11)

	var readerWg sync.WaitGroup
	readerWg.Add(1)
	go func() {
		defer readerWg.Done()
		for v := range ch {
			fmt.Println(v)
		}
	}()

	readerWg.Wait()
}
