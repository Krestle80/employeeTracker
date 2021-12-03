DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE depts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30 NOT NULL),
    salary DECIMAL(30, 2 NOT NULL)
    dept_id INT
    FOREIGN KEY (depts_id)
    REFERENCES dept(id)
    ON DELETE SET NULL
);

CREATE TABLE ee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    manager_id INT,
    roles_id INT
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
)