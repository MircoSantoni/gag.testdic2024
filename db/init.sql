DROP TABLE IF EXISTS clients;

CREATE TEMP TABLE temp_clients (
    id INTEGER,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(255),
    ip_address VARCHAR(255),
    country VARCHAR(255)
);

\copy temp_clients FROM '/docker-entrypoint-initdb.d/data.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');

CREATE TABLE clients (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

INSERT INTO clients (first_name, last_name, email, gender, ip_address, country)
SELECT 
    first_name,
    last_name,
    email,
    gender,
    ip_address,
    country 
FROM temp_clients;

SELECT setval(pg_get_serial_sequence('clients', 'id'), (SELECT MAX(id) FROM clients));

DROP TABLE temp_clients;


SELECT COUNT(*) FROM clients;