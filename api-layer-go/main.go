package main

import (
	"api-layer-go/datastruct"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	var err error

	DB_USER, ok := os.LookupEnv("DB_USER")
	if !ok {
		log.Fatal("DB_USER must be set and non-empty")
	}

	DB_PASSWORD, ok := os.LookupEnv("DB_PASSWORD")
	if !ok {
		log.Fatal("DB_PASSWORD must be set and non-empty")
	}

	DB_NAME, ok := os.LookupEnv("DB_NAME")
	if !ok {
		log.Fatal("DB_NAME must be set and non-empty")
	}

	DB_HOST, ok := os.LookupEnv("DB_HOST")
	if !ok {
		log.Fatal("DB_HOST must be set and non-empty")
	}

	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable port=5432", DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
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

	// Run database migrations
	runMigrations()

	router := mux.NewRouter()
	router.HandleFunc("/api/users", getUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", getUser).Methods("GET")
	router.HandleFunc("/api/register-public-key", registerPublicKey).Methods("POST")
	router.HandleFunc("/api/ban-user", banUser).Methods("POST")
	router.HandleFunc("/api/platform-stats", getPlatformStats).Methods("GET")
	// ... other CRUD operations

	log.Fatal(http.ListenAndServe(":3000", router))
}

func runMigrations() {
	entries, err := os.ReadDir("/datastruct/migration")
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		path := filepath.Join("/datastruct/migration", entry.Name())
		content, err := os.ReadFile(path)
		if err != nil {
			log.Fatal(err)
		}

		_, err = db.Exec(string(content))
		if err != nil {
			log.Fatal(err)
		}
	}
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, email, public_key, banned FROM users")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []datastruct.User
	for rows.Next() {
		var u datastruct.User
		err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.PublicKey, &u.Banned)
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

	var u datastruct.User
	err := db.QueryRow("SELECT id, name, email, public_key, banned FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name, &u.Email, &u.PublicKey, &u.Banned)
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

func registerPublicKey(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.PublicKey == "" {
		http.Error(w, "Public key is required", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO users (public_key) VALUES ($1) ON CONFLICT (public_key) DO NOTHING", req.PublicKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func banUser(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE users SET banned = TRUE WHERE public_key = $1", req.PublicKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func getPlatformStats(w http.ResponseWriter, r *http.Request) {
	var stats struct {
		TotalUsers  int `json:"totalUsers"`
		BannedUsers int `json:"bannedUsers"`
		ActiveUsers int `json:"activeUsers"`
	}

	err := db.QueryRow("SELECT COUNT(*) FROM users").Scan(&stats.TotalUsers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = db.QueryRow("SELECT COUNT(*) FROM users WHERE banned = TRUE").Scan(&stats.BannedUsers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stats.ActiveUsers = stats.TotalUsers - stats.BannedUsers

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}
