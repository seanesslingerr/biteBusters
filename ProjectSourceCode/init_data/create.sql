DROP TABLE IF EXISTS users;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

CREATE TABLE classes(
    class_code VARCHAR(9) PRIMARY KEY,
    name CHAR(60) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE users_to_classes(
    username VARCHAR(50) PRIMARY KEY,
    class_code VARCHAR(9) NOT NULL,
    grade CHAR(1),
    semester VARCHAR(4),
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
    FOREIGN KEY (class_code) REFERENCES classes (class_code) ON DELETE CASCADE
);

CREATE TABLE majors(
    major VARCHAR(50) PRIMARY KEY,
    name CHAR(60) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE major_to_classes(
    major VARCHAR(50) PRIMARY KEY,
    class_code VARCHAR(9) NOT NULL,
    requirment_met  CHAR(1) NOT NULL,
    FOREIGN KEY (major) REFERENCES majors (major) ON DELETE CASCADE,
    FOREIGN KEY (class_code) REFERENCES classes (class_code) ON DELETE CASCADE
);

