-- @BLOCK create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT NOT NULL,
    vacations_id INT
);

-- @BLOCK example insert
INSERT INTO users (first_name, last_name, username, password, is_admin)
VALUES ('Daniel', 'Fitzgerald', 'DanBoi', '123456789', 0);

-- @BLOCK example insert admin
INSERT INTO users (first_name, last_name, username, password, is_admin)
VALUES ('Gabriel', 'Lellouche', 'admin', 'killme', 1);

-- @BLOCK create vacations table
CREATE TABLE vacations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    destination VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    img VARCHAR(255),
    price DECIMAL(15,2) NOT NULL,
    followers INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- @BLOCK example insert
INSERT INTO vacations (destination, description, price, start_date, end_date)
VALUES ('Hawaii', 'Obama was born here, allegedly', 520.3, 	STR_TO_DATE('21/05/2021','%d/%m/%Y'),STR_TO_DATE('01/06/2021','%d/%m/%Y'));

-- @BLOCK example insert
INSERT INTO vacations (destination, description, price, start_date, end_date)
VALUES ('Hawaii2', 'Obama was born here, allegedly', 520.3,'2021-05-21','2021-06-01');

-- @BLOCK create follows table
    CREATE TABLE follows (
        follower_id INT NOT NULL,
        vacation_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (follower_id) REFERENCES users(id),
        FOREIGN KEY (vacation_id) REFERENCES vacations(id),
        PRIMARY KEY(follower_id,vacation_id)
    );

-- @BLOCK
SELECT * FROM users;

-- @BLOCK
SELECT * FROM follows;

-- @BLOCK
SELECT * FROM vacations;

-- @BLOCK
UPDATE users SET is_admin = 1 WHERE id=1;

-- @BLOCK
DROP TABLE vacations;

-- @BLOCK
DELETE FROM vacations;

-- @BLOCK
ALTER TABLE vacations AUTO_INCREMENT= 0;
