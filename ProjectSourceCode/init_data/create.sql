DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS users_to_classes;
DROP TABLE IF EXISTS majors;
DROP TABLE IF EXISTS major_to_classes;

CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(60) NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE classes(
    class_code VARCHAR(9) PRIMARY KEY,
    credit_hours INTEGER,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE users_to_classes(
    username VARCHAR(50),
    class_code VARCHAR(9),
    grade CHAR(1),
    semester VARCHAR(4),
    PRIMARY KEY (username, class_code),
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
    FOREIGN KEY (class_code) REFERENCES classes (class_code) ON DELETE CASCADE
);

CREATE TABLE majors(
    major VARCHAR(50) PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE major_to_classes(
    major VARCHAR(50),
    class_code VARCHAR(9),
    requirement_met CHAR(1) NOT NULL,
    PRIMARY KEY (major, class_code),
    FOREIGN KEY (major) REFERENCES majors (major) ON DELETE CASCADE,
    FOREIGN KEY (class_code) REFERENCES classes (class_code) ON DELETE CASCADE
);
