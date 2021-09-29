DROP DATABASE IF EXISTS workforce_db;
CREATE DATABASE workforce_db;

USE workforce_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

DROP TABLE IF EXISTS manager;
CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    managerName VARCHAR(30)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY(role_id) 
    REFERENCES department(id),
    manager_id INT
);

