CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(200)
);

CREATE TABLE planets (
    id SERIAL PRIMARY KEY,
    planet_id INT,
    planet_name VARCHAR(50),
    user_id INT,
    submission_time TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
);