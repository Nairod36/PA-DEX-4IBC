package datastruct

type Token struct {
	ID     int     `json:"id"`
	Name   string  `json:"name"`
	Symbol string  `json:"symbol"`
	Price  float64 `json:"price"`
}

type StackingPool struct {
	ID          int     `json:"id"`
	TokenID     int     `json:"token_id"`
	TotalAmount float64 `json:"total_amount"`
}

type LiquidityPool struct {
	ID           int     `json:"id"`
	TokenAID     int     `json:"tokenA_id"`
	TokenBID     int     `json:"tokenB_id"`
	TotalAmountA float64 `json:"total_amountA"`
	TotalAmountB float64 `json:"total_amountB"`
}

type Transaction struct {
	ID        int     `json:"id"`
	UserID    int     `json:"user_id"`
	PoolID    int     `json:"pool_id"`
	PoolType  string  `json:"pool_type"` // 'stacking' or 'liquidity'
	AmountA   float64 `json:"amountA"`
	AmountB   float64 `json:"amountB,omitempty"` // Only for liquidity pools
	CreatedAt string  `json:"created_at"`
}
