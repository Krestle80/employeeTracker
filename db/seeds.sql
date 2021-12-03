INSERT INTO depts (dept_name)
VALUES  ('Sales'),
        ('HR'),
        ('Safety'),
        ('Manufactoring');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Sales Manager', 100000, 1),
       ('Sales Associate', 40000, 1),
       ('HR Rep', 75000,2)
       ('Safety Manager',80000, 3),
       ('Union Safety Rep', 60000, 3),
       ('Floor Manager', 70000, 4),
       ('line Worker', 50000, 4);