package main

import (
	"net/http"
)

func middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()        // get request context
		req := r.WithContext(ctx) // shalow copy or `r` with new context

		h.ServeHTTP(w, req)
	})
}

func main() {
	server := http.Server{
		Addr: ":8080",
		Handler: middleware(http.HandlerFunc(
			func(w http.ResponseWriter, r *http.Request) {
				w.Header().Add("x-handler-header", "set by handler")
				w.WriteHeader(200)
				w.Write([]byte("Hello!\n"))
			})),
	}

	server.ListenAndServe()
}
