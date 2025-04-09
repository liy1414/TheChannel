package main

import (
	"encoding/gob"
	"log"
	"net/http"
	"os"

	"github.com/boj/redistore"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

var rootStaticFolder = os.Getenv("ROOT_STATIC_FOLDER")

func main() {
	gob.Register(Session{})

	var err error
	store, err = redistore.NewRediStore(10, redisType, redisAddr, "", redisPass, []byte(secretKey))
	if err != nil {
		panic(err)
	}
	store.SetMaxAge(60 * 60 * 24)
	store.Options.HttpOnly = true
	defer store.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Route("/api", func(api chi.Router) {
		api.Get("/channel/info", getChannelInfo)
		api.Get("/messages", getMessages)
		api.Get("/events", getEvents)
		api.Post("/auth/login", login)
		api.Post("/auth/logout", logout)
		api.Get("/files/{fileid}", serveFile)

		api.Post("/import/post", addNewPost)

		api.Route("/auth", func(protected chi.Router) {
			protected.Use(checkPrivilege)
			protected.Get("/user-info", getUserInfo)
			protected.Post("/edit-channel-info", editChannelInfo)
			protected.Post("/new", addMessage)
			protected.Post("/edit-message", updateMessage)
			protected.Get("/delete-message/{id}", deleteMessage)
			protected.Post("/upload", uploadFile)
		})
	})

	if rootStaticFolder != "" {
		r.Handle("/", http.FileServer(http.Dir("/usr/share/ng")))
		r.Handle("/assets/*", http.StripPrefix("/assets/", http.FileServer(http.Dir("/usr/share/ng"))))
		r.NotFound(func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, "/usr/share/ng/index.html")
		})
	}

	if err := http.ListenAndServe(":"+os.Getenv("SERVER_PORT"), r); err != nil {
		log.Fatal(err)
	}
}
