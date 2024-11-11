DROP TABLE IF EXISTS users;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

CREATE TABLE classes(
    clcasscode VARCHAR(9) PRIMARY KEY,
    Name CHAR(60) NOT NULL,
    description VARCHAR(500)
);

