package main

import (
	"context"
	"net/http"
	"time"
)

func timeoutMiddleware(d time.Duration) func(h http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			ctx, cancelFunc := context.WithTimeout(ctx, d*time.Millisecond)
			defer cancelFunc()
			r = r.WithContext(ctx)
			h.ServeHTTP(rw, r)
		})
	}
}

func main() {

}
