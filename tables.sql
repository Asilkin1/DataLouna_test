-- store user information in Postrges
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  balance FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- store fake products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL
);


INSERT INTO products (name, price) VALUES
('Test Product 1', 11.20),
('Test Product 2', 9.34),
('Test Product 3', 1.12)