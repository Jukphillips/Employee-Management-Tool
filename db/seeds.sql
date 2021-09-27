INSERT INTO department (dept_name) VALUES ("Web Development"), ("Testing");

INSERT INTO roles (id, title, salary, department_id) VALUES (1, "javascript Developer", 50000, 1),
(2, "QA and TEsting", 60000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Justin", "Phillips", 1, 1), 
(2, "Mike", "Shephard", 2, 1);

INSERT INTO manager (managerName) VALUES ("Ben Macchok");