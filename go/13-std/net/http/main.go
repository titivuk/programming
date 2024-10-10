package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"time"
)

func clientExample() {
	ctx := context.TODO()
	client := &http.Client{
		Timeout: 3 * time.Second,
	}

	// GET request
	req, err := http.NewRequestWithContext(ctx, "GET", "https://jsonplaceholder.typicode.com/todos/1", nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("X-My-Client", "Learning Go")
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	// res.Body implements io.ReadCloser
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

func serverExample() {
	root := http.NewServeMux()

	requestTimer := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			h.ServeHTTP(w, r)
			dur := time.Since(start)
			slog.Info("Request time", "path", r.URL.Path, "duration", dur)
		})
	}

	headerAppender := func(key string, value string) func(http.Handler) http.Handler {
		return func(h http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				w.Header().Add(key, value)
				h.ServeHTTP(w, r)
			})
		}
	}

	root.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("x-handler-header", "set by handler")
		w.WriteHeader(200)
		w.Write([]byte("Hello!\n"))
	})

	// middlewares can wrap specific handler
	root.Handle(
		"/hello/measured",
		// request handler is wrapped by middleware
		requestTimer(http.HandlerFunc(
			func(w http.ResponseWriter, r *http.Request) {
				w.Header().Add("x-handler-header", "set by handler")
				w.WriteHeader(200)
				w.Write([]byte("Hello!\n"))
			})))

	// middlewares can wrap router
	fooAppender := headerAppender("x-foo", "bar")
	wrappedRoot := fooAppender(root)

	server := http.Server{
		Addr: ":8080",
		Handler: wrappedRoot,
	}

	server.ListenAndServe()
}

func main() {
	clientExample()
	serverExample()
}
