package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func clientExample(ctx context.Context) {
	client := &http.Client{
		Timeout: 3 * time.Second,
	}

	// create request with context
	req, err := http.NewRequestWithContext(ctx, "GET", "https://jsonplaceholder.typicode.com/todos/1", nil)
	if err != nil {
		panic(err)
	}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	var data struct {
		UserId    int    `json:"userId"`
		Id        int    `json:"id"`
		Title     string `json:"title"`
		Completed bool   `json:"completed"`
	}

	// io.Reader can be passed into decoder
	err = json.NewDecoder(res.Body).Decode(&data)
	if err != nil {
		panic(err)
	}

	fmt.Printf("data: %+v\n", data)
}

func main() {
	ctx := context.Background()
	clientExample(ctx)
}
