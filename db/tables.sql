-- DROP DATABASE mexico;

-- CREATE DATABASE mexico;

-- USE mexico;

-- CREATE TABLE states (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     state_name VARCHAR(100) NOT NULL UNIQUE,
--     official_name VARCHAR(100),
--     capital VARCHAR(100),
--     largest_city VARCHAR(100),
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE places (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     place_name VARCHAR(255) NOT NULL UNIQUE,
--     city VARCHAR(255) NOT NULL,
--     state_id INT NOT NULL,
--     place_description TEXT,
--     img VARCHAR(255),
--     img_wide VARCHAR(255),
--     created_at TIMESTAMP DEFAULT NOW(),
--     FOREIGN KEY(state_id) REFERENCES states(id) ON DELETE CASCADE
-- );