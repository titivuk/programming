package main

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"sync"
	"time"
)

func makeRequest(ctx context.Context, url string) (*http.Response, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		fmt.Println("error in status goroutine:", err)
		return nil, err
	}
	return http.DefaultClient.Do(req)
}

func testWithHttpAutoCancel() {
	// 2 goroutines write to a single chan simultaneously
	// and we handle all resources using cancellable context

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ch := make(chan string)
	// use waitgroup to make sure every goroutine exited
	// if implementation is wrong and some goroutine keep going
	// then we will stuck on wg.Wait() in the end of the main func
	// and our program won't exit
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		// tell wg goroutine exited
		defer wg.Done()

		for {
			res, err := makeRequest(ctx, "http://httpbin.org/status/200,200,200,500")
			// we receive cancellation error here because makeRequest uses http package to make request
			// and http handles context cancellations automatically
			if err != nil {
				fmt.Println("error in status goroutine:", err)
				cancel()
				return
			}

			if res.StatusCode == http.StatusInternalServerError {
				fmt.Println("bad status, exiting")
				cancel()
				return
			}

			// select is used to always go to the next iteration if context cancelled and writing to channel is blocked
			// that can happen I guess when some goroutine writes to chan, then ctx is cancelled and, as a result, value is not read,
			// and another goroutine attemps to write to chan and end up blocked
			// but with select we execute ctx.Done() case and jump on the next iteration where we receive err about cancellation
			// select {
			// case ch <- "success from status":
			// no need to return here since http package will return error on cancellation
			// and we will return on error handling
			// see manual cancellation example in case there is no such
			// case <-ctx.Done():
			// }

			ch <- "success from status 1"
			cancel()

			time.Sleep(1 * time.Second)
		}
	}()

	go func() {
		// tell wg goroutine exited
		defer wg.Done()

		for {
			res, err := makeRequest(ctx, "http://httpbin.org/delay/1")
			// we receive cancellation error here because makeRequest uses http package to make request
			// and http handles context cancellations automatically
			if err != nil {
				fmt.Println("error in delay goroutine:", err)
				cancel()
				return
			}

			// select is used to always go to the next iteration if context cancelled and writing to channel is blocked
			// that can happen I guess when some goroutine writes to chan, then ctx is cancelled and, as a result, value is not read,
			// and another goroutine attemps to write to chan and end up blocked
			// but with select we execute ctx.Done() case and jump on the next iteration where we receive err about cancellation
			// select {
			// case ch <- "success from delay: " + res.Header.Get("date"):
			// no need to return here since http package will return error on cancellation
			// and we will return on error handling
			// see manual cancellation example in case there is no such
			// case <-ctx.Done():
			// }
			ch <- "success from delay 1: " + res.Header.Get("date")
			cancel()
		}
	}()

	// listen to goroutines output
loop:
	for {
		select {
		case s := <-ch:
			fmt.Println("in main:", s)
		case <-ctx.Done():
			fmt.Println("in main: cancelled")
			break loop
		}
	}

	// check if goroutines exited
	wg.Wait()
}

func testWithManualCancel() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ch := make(chan string)
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		// tell wg goroutine exited
		defer wg.Done()
		i := 0

		for {

			if i > 3 {
				cancel()
			}

			select {
			case ch <- "i: " + strconv.FormatInt(int64(i), 10):
			// when channel is closed manually stop the goroutine
			case <-ctx.Done():
				fmt.Println("1G: received cancellation msg")
				return
			}

			i++
		}
	}()

	go func() {
		// tell wg goroutine exited
		defer wg.Done()

		for {
			time.Sleep(3 * time.Second)
			fmt.Println("2nd goroutine woke up after sleep")

			select {
			case ch <- "2nd g: I am awake":
			// when channel is closed manually stop the goroutine
			case <-ctx.Done():
				fmt.Println("2G: received cancellation msg")
				return
			}
		}
	}()

	// listen to goroutines output
loop:
	for {
		select {
		case s := <-ch:
			fmt.Println("in main:", s)
		case <-ctx.Done():
			fmt.Println("in main: cancelled")
			break loop
		}
	}

	// check if goroutines exited
	wg.Wait()
}

func main() {
	testWithHttpAutoCancel()
	// testWithManualCancel()
}
