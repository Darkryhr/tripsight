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
SELECT first_name,count(*) as c FROM users GROUP BY first_name;

-- @BLOCK
SELECT first_name,count(*) as c FROM users GROUP BY first_name;

-- @BLOCK get all vacations a user follows
SELECT * FROM vacations
INNER JOIN follows
ON follows.vacation_id = vacations.id;

-- @BLOCK show all vacations by how many followers they have - 'c'
SELECT *, count(*) as c FROM vacations
INNER JOIN follows
ON follows.vacation_id = vacations.id
GROUP BY destination;

-- @BLOCK
SELECT  * FROM vacations
LEFT JOIN FOLLOWS
ON follows.vacation_id = vacations.id
GROUP BY vacations.id
ORDER BY CASE WHEN follower_id = 1 THEN 1 ELSE 2 END
;

-- @BLOCK get vacations user is following
SELECT DISTINCT id FROM follows
RIGHT JOIN vacations 
ON follows.vacation_id = vacations.id
WHERE follower_id = 1;

-- @BLOCK 
SELECT * FROM follows
LEFT JOIN vacations 
ON follows.vacation_id = vacations.id
ORDER BY CASE WHEN id = 1 THEN 1 ELSE 2 END
;

-- @BLOCK
UPDATE users SET is_admin = 1 WHERE id=1;

-- @BLOCK
ALTER TABLE vacations AUTO_INCREMENT= 0;


-- @BLOCK
DELETE FROM vacations WHERE id > 12;

-- @BLOCK
SELECT * FROM vacations;