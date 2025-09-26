package main

import (
	"net/http"
	"context"
	"fmt"
)

// IT HAS TO BE SEPARATE PACKAGE WITH PRIVATE FIELDS

type Level string

const (
	Debug Level = "debug"
	Info  Level = "info"
)

type logKey int

const (
	_ logKey = iota
	key
)

func ContextWithLevel(ctx context.Context, level Level) context.Context {
	return context.WithValue(ctx, key, level)
}

func LevelFromContext(ctx context.Context) (Level, bool) {
	level, ok := ctx.Value(key).(Level)
	return level, ok
}

func Log(ctx context.Context, level Level, message string) {
	var inLevel Level
	inLevel, ok := LevelFromContext(ctx)
	if !ok {
		return
	}
	if level == Debug && inLevel == Debug {
		fmt.Println(message)
	}
	if level == Info && (inLevel == Debug || inLevel == Info) {
		fmt.Println(message)
	}
}

func Middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		level := r.URL.Query().Get("log_level")
		ctx := ContextWithLevel(r.Context(), Level(level))
		r = r.WithContext(ctx)
		h.ServeHTTP(w, r)
	})
}

// ACTUAL MAIN PACKAGE

func main() {
	server := http.Server{
		Handler: Middleware(http.HandlerFunc(message)),
		Addr:    ":8080",
	}
	server.ListenAndServe()
}

func message(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	Log(ctx, Debug, "This is a debug message")
	Log(ctx, Info, "This is an info message")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
