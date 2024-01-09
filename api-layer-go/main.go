package main

import (
    "database/sql"
    "log"
    "net/http"
    "encoding/json"
    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)

var db *sql.DB

func main() {
    var err error
    connStr := "user=myuser password=mypassword dbname=mydatabase sslmode=disable"
    db, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Verify connection to database
    err = db.Ping()
    if err != nil {
        log.Fatal(err)
    }

    router := mux.NewRouter()
    router.HandleFunc("/api/users", getUsers).Methods("GET")
    router.HandleFunc("/api/users/{id}", getUser).Methods("GET")
    // ... other CRUD operations

    log.Fatal(http.ListenAndServe(":8080", router))
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT * FROM users")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []User // User is a struct representing your user model
    for rows.Next() {
        var u User
        err := rows.Scan(&u.ID, &u.Name, &u.Email) // Adjust attributes based on your user table
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        users = append(users, u)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func getUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id := params["id"]

    var u User
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name, &u.Email) // Adjust attributes
    if err != nil {
        if err == sql.ErrNoRows {
            http.NotFound(w, r)
            return
        }
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(u)
}

