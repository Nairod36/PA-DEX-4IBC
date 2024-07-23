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

	"github.com/gorilla/handlers"
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
	router.HandleFunc("/api/unban-user", unbanUser).Methods("POST")
	router.HandleFunc("/api/platform-stats", getPlatformStats).Methods("GET")
	router.HandleFunc("/api/check-banned/{publicKey}", checkBanned).Methods("GET")
	router.HandleFunc("/api/check-admin/{publicKey}", checkAdmin).Methods("GET")
	router.HandleFunc("/api/add-admin", addAdmin).Methods("POST")
	router.HandleFunc("/api/remove-admin", removeAdmin).Methods("POST")

	// New routes for stacking pools, liquidity pools, and transactions
	router.HandleFunc("/api/stacking-pools", createStackingPool).Methods("POST")
	router.HandleFunc("/api/stacking-pools", getStackingPools).Methods("GET")
	router.HandleFunc("/api/stacking-pools/{id}", getStackingPool).Methods("GET")
	router.HandleFunc("/api/stacking-pools/{id}", updateStackingPool).Methods("PUT")
	router.HandleFunc("/api/stacking-pools/{id}", deleteStackingPool).Methods("DELETE")

	router.HandleFunc("/api/liquidity-pools", createLiquidityPool).Methods("POST")
	router.HandleFunc("/api/liquidity-pools", getLiquidityPools).Methods("GET")
	router.HandleFunc("/api/liquidity-pools/{id}", getLiquidityPool).Methods("GET")
	router.HandleFunc("/api/liquidity-pools/{id}", updateLiquidityPool).Methods("PUT")
	router.HandleFunc("/api/liquidity-pools/{id}", deleteLiquidityPool).Methods("DELETE")

	router.HandleFunc("/api/transactions", createTransaction).Methods("POST")
	router.HandleFunc("/api/transactions", getTransactions).Methods("GET")
	router.HandleFunc("/api/transactions/{id}", getTransaction).Methods("GET")

	corsOptions := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost", "http://localhost:80", "http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	log.Fatal(http.ListenAndServe(":3000", corsOptions(router)))
}

func runMigrations() {
	entries, err := os.ReadDir("/migrations")
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		path := filepath.Join("/migrations", entry.Name())
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
	var data struct {
		PublicKey string `json:"publicKey"`
	}
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the public key already exists in the database
	var exists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE public_key = $1)", data.PublicKey).Scan(&exists)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !exists {
		_, err = db.Exec("INSERT INTO users (public_key) VALUES ($1)", data.PublicKey)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
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

func unbanUser(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE users SET banned = FALSE WHERE public_key = $1", req.PublicKey)
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

func checkBanned(w http.ResponseWriter, r *http.Request) {
	publicKey := mux.Vars(r)["publicKey"]

	var banned bool
	err := db.QueryRow("SELECT banned FROM users WHERE public_key = $1", publicKey).Scan(&banned)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"banned": banned})
}

func checkAdmin(w http.ResponseWriter, r *http.Request) {
	publicKey := mux.Vars(r)["publicKey"]

	var isAdmin bool
	err := db.QueryRow("SELECT is_admin FROM users WHERE public_key = $1", publicKey).Scan(&isAdmin)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"isAdmin": isAdmin})
}

func addAdmin(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE users SET is_admin = TRUE WHERE public_key = $1", req.PublicKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func removeAdmin(w http.ResponseWriter, r *http.Request) {
	var req struct {
		PublicKey string `json:"publicKey"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE users SET is_admin = FALSE WHERE public_key = $1", req.PublicKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

// New Handlers

func createStackingPool(w http.ResponseWriter, r *http.Request) {
	var pool datastruct.StackingPool
	if err := json.NewDecoder(r.Body).Decode(&pool); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := db.QueryRow(
		"INSERT INTO stacking_pools (token_id, total_amount) VALUES ($1, $2) RETURNING id",
		pool.TokenID, pool.TotalAmount,
	).Scan(&pool.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(pool)
}

func getStackingPools(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, token_id, total_amount FROM stacking_pools")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var pools []datastruct.StackingPool
	for rows.Next() {
		var pool datastruct.StackingPool
		if err := rows.Scan(&pool.ID, &pool.TokenID, &pool.TotalAmount); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pools = append(pools, pool)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pools)
}

func getStackingPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var pool datastruct.StackingPool

	err := db.QueryRow("SELECT id, token_id, total_amount FROM stacking_pools WHERE id = $1", id).Scan(
		&pool.ID, &pool.TokenID, &pool.TotalAmount,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.NotFound(w, r)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pool)
}

func updateStackingPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var pool datastruct.StackingPool
	if err := json.NewDecoder(r.Body).Decode(&pool); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := db.Exec("UPDATE stacking_pools SET token_id = $1, total_amount = $2 WHERE id = $3",
		pool.TokenID, pool.TotalAmount, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func deleteStackingPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	_, err := db.Exec("DELETE FROM stacking_pools WHERE id = $1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func createLiquidityPool(w http.ResponseWriter, r *http.Request) {
	var pool datastruct.LiquidityPool
	if err := json.NewDecoder(r.Body).Decode(&pool); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := db.QueryRow(
		"INSERT INTO liquidity_pools (tokenA_id, tokenB_id, total_amountA, total_amountB) VALUES ($1, $2, $3, $4) RETURNING id",
		pool.TokenAID, pool.TokenBID, pool.TotalAmountA, pool.TotalAmountB,
	).Scan(&pool.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(pool)
}

func getLiquidityPools(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, tokenA_id, tokenB_id, total_amountA, total_amountB FROM liquidity_pools")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var pools []datastruct.LiquidityPool
	for rows.Next() {
		var pool datastruct.LiquidityPool
		if err := rows.Scan(&pool.ID, &pool.TokenAID, &pool.TokenBID, &pool.TotalAmountA, &pool.TotalAmountB); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pools = append(pools, pool)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pools)
}

func getLiquidityPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var pool datastruct.LiquidityPool

	err := db.QueryRow("SELECT id, tokenA_id, tokenB_id, total_amountA, total_amountB FROM liquidity_pools WHERE id = $1", id).Scan(
		&pool.ID, &pool.TokenAID, &pool.TokenBID, &pool.TotalAmountA, &pool.TotalAmountB,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.NotFound(w, r)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pool)
}

func updateLiquidityPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var pool datastruct.LiquidityPool
	if err := json.NewDecoder(r.Body).Decode(&pool); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := db.Exec("UPDATE liquidity_pools SET tokenA_id = $1, tokenB_id = $2, total_amountA = $3, total_amountB = $4 WHERE id = $5",
		pool.TokenAID, pool.TokenBID, pool.TotalAmountA, pool.TotalAmountB, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func deleteLiquidityPool(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	_, err := db.Exec("DELETE FROM liquidity_pools WHERE id = $1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func createTransaction(w http.ResponseWriter, r *http.Request) {
	var tx datastruct.Transaction
	if err := json.NewDecoder(r.Body).Decode(&tx); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := db.QueryRow(
		"INSERT INTO transactions (user_id, pool_id, pool_type, amountA, amountB) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		tx.UserID, tx.PoolID, tx.PoolType, tx.AmountA, tx.AmountB,
	).Scan(&tx.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tx)
}

func getTransactions(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, user_id, pool_id, pool_type, amountA, amountB, created_at FROM transactions")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var transactions []datastruct.Transaction
	for rows.Next() {
		var tx datastruct.Transaction
		if err := rows.Scan(&tx.ID, &tx.UserID, &tx.PoolID, &tx.PoolType, &tx.AmountA, &tx.AmountB, &tx.CreatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		transactions = append(transactions, tx)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}

func getTransaction(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var tx datastruct.Transaction

	err := db.QueryRow("SELECT id, user_id, pool_id, pool_type, amountA, amountB, created_at FROM transactions WHERE id = $1", id).Scan(
		&tx.ID, &tx.UserID, &tx.PoolID, &tx.PoolType, &tx.AmountA, &tx.AmountB, &tx.CreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.NotFound(w, r)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tx)
}
