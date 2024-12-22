-- init.sql
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(255),
    ip_address VARCHAR(255),
    country VARCHAR(255)
);

COPY clients (id, first_name, last_name, email, gender, ip_address, country)
FROM '/docker-entrypoint-initdb.d/data.csv' 
DELIMITER ',' 
CSV HEADER;
