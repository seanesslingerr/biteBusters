INSERT INTO users
  (username, email, password)
VALUES
  ('boab','boab@colorado.edu', '1234');
INSERT INTO classes
  (class_code, credit_hours, name, description)
VALUES
  ('CSCI1000', 1, 'Computer Science as a Field of Work and Study', 'none'),
  ('CSCI1300', 4, 'Computer Science 1: Starting Computing', 'none'),
  ('CSCI2270', 4, 'Computer Science 2: Data Structures', 'none'),
  ('CSCI2400', 4, 'Computer Systems', 'none'),
  ('CSCI3104', 4, 'Algorithms', 'none'),
  ('CSCI3155', 4, 'Principles of Programming Languages', 'none'),
  ('CSCI3308', 3, 'Software Development Methods and Tools', 'none'),
  ('CSCI3002', 4, 'Fundamentals of Human Computer Interaction', 'none'),
  ('CSCI3202', 3, 'Introduction to Artificial Intelligence', 'none'),
  ('CSCI3287', 3, 'Design & Analysis of Database Systems', 'none'),
  ('CSCI3302', 3, 'Introduction to Robotics', 'none'),
  ('CSCI3403', 4, 'Introduction to CyberSecurity for a Converged World', 'none'),
  ('CSCI3434', 3, 'Theory of Computation', 'none'),
  ('CSCI3656', 3, 'Numerical Computation', 'none'),
  ('CSCI3753', 4, 'Design & Analysis of Operating Systems', 'none'),
  ('CSCI4022', 3, 'Advanced Data Science', 'none'),
  ('CSCI4273', 3, 'Network Systems', 'none'),
  ('CSCI4448', 3, 'Object-Oriented Analysis and Design', 'none'),
  ('CSCI4308', 4, 'Software Engineering Project 1', 'none'),
  ('CSCI4318', 4, 'Software Engineering Project 2', 'none'),
  ('CSCI4348', 4, 'Startup Essentials: Entrepreneurial Projects 1', 'none'),
  ('CSCI4358', 4, 'Entrepreneurial Projects 2', 'none'),
  ('CSCI4368', 3, 'Multidisciplinary Design Project 1', 'none'),
  ('CSCI4378', 3, 'Multidisciplinary Design Project 2', 'none'),
  ('CSCI4950', 4, 'Senior Thesis', 'none'),
  ('CSCI3100', 1, 'Software and Society', 'none'),
  ('APPM1350', 4, 'Calculus 1 for Engineers', 'none'),
  ('APPM1360', 4, 'Calculus 2 for Engineers', 'none'),
  ('CSCI2824', 3, 'Discrete Structures', 'none'),
  ('CSCI2820', 3, 'Linear Algebra with CS Applications', 'none');
  

INSERT INTO users_to_classes
  (username, class_code, grade, semester)
VALUES
  ('boab1111', 'CSCI1000', 'A', 'FA24'),
  ('boab1121', 'CSCI2000', 'A', 'FA24');;