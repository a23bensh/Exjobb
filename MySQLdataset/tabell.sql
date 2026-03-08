CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn13 VARCHAR(20),
    isbn10 VARCHAR(20),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    authors VARCHAR(255),
    categories VARCHAR(100),
    thumbnail VARCHAR(500),
    description TEXT,
    published_year INT,
    average_rating DECIMAL(3,2),
    num_pages INT,
    ratings_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);