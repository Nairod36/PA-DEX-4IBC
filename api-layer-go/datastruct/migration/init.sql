-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    public_key VARCHAR(255) UNIQUE NOT NULL,
    banned BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);

-- StackingPool table
CREATE TABLE IF NOT EXISTS stacking_pools (
    id SERIAL PRIMARY KEY,
    token_id INT NOT NULL,
    total_amount DECIMAL(18, 8) NOT NULL
);

-- LiquidityPool table
CREATE TABLE IF NOT EXISTS liquidity_pools (
    id SERIAL PRIMARY KEY,
    tokenA_id INT NOT NULL,
    tokenB_id INT NOT NULL,
    total_amountA DECIMAL(18, 8) NOT NULL,
    total_amountB DECIMAL(18, 8) NOT NULL
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_Pkey VARCHAR(255) UNIQUE NOT NULL,
    pool_id INT NOT NULL,
    pool_type VARCHAR(50) NOT NULL, -- 'stacking' or 'liquidity'
    amountA DECIMAL(18, 8) NOT NULL,
    amountB DECIMAL(18, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_Pkey) REFERENCES users(public_key),
    CHECK (pool_type IN ('stacking', 'liquidity'))
);
    