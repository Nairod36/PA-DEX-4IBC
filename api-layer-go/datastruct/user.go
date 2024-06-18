package datastruct

type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	PublicKey string `json:"publicKey"`
	Banned    bool   `json:"banned"`
	IsAdmin   bool   `json:"isAdmin"`
}
