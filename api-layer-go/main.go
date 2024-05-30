package main

import (
	"api-layer-go/datastruct"
	"api-layer-go/liquiditypool"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gofiber/fiber/v2"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

var db *sql.DB

type RequestData struct {
	TokenInAddress string `json:"tokenInAddress"`
	AmountIn       int64  `json:"amountIn"`
}

func connectToEthereum() (*ethclient.Client, error) {
	alchemyAPIURL := os.Getenv("ALCHEMY_API_URL")
	client, err := ethclient.Dial(alchemyAPIURL)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func getContractInstance(client *ethclient.Client, address common.Address) (*liquiditypool.LiquidityPool, error) {
	instance, err := liquiditypool.NewLiquidityPool(address, client)
	if err != nil {
		return nil, err
	}
	return instance, nil
}

func callSmartContract(c *fiber.Ctx) error {
	var data RequestData
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	client, err := connectToEthereum()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// Adresse du contrat de swap
	contractAddress := common.HexToAddress("votre_adresse_contrat")

	instance, err := getContractInstance(client, contractAddress)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// Conversion de l'amountIn en *big.Int
	amountIn := big.NewInt(data.AmountIn)

	// Créez un objet auth pour signer la transaction
	privateKey, err := crypto.HexToECDSA(os.Getenv("PRIVATE_KEY"))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Invalid private key"})
	}
	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(1)) // Assurez-vous de configurer correctement l'objet auth
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	tx, err := instance.Swap(auth, common.HexToAddress(data.TokenInAddress), amountIn)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(tx)
}

func main() {
	// Charger les variables d'environnement depuis un fichier .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()

	app.Post("/api/swap", callSmartContract)

	DB_USER := os.Getenv("DB_USER")
	DB_PASSWORD := os.Getenv("DB_PASSWORD")
	DB_NAME := os.Getenv("DB_NAME")
	DB_HOST := os.Getenv("DB_HOST")

	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable port=5432", DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	var err error
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

	log.Fatal(app.Listen(":8080"))
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []datastruct.User // User is a struct representing your user model
	for rows.Next() {
		var u datastruct.User
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

	var u datastruct.User
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
