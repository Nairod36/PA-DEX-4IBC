CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    public_key VARCHAR(255) UNIQUE NOT NULL,
    banned BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);
