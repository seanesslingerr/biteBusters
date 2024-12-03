INSERT INTO users
  (username, email, password, name, GPA, hours)
VALUES
  ('boab','boab1234@colorado.edu', '1234', 'Boston', '4.00', 5);
INSERT INTO classes
  (class_code, credit_hours, name, prereq)
VALUES
  ('CSCI1000', 1, 'Computer Science as a Field of Work and Study', 'none'),
  ('CSCI1300', 4, 'Computer Science 1: Starting Computing', 'none'),
  ('CSCI2270', 4, 'Computer Science 2: Data Structures', 'CSCI1300'),
  ('CSCI2400', 4, 'Computer Systems', 'CSCI2270'),
  ('CSCI3104', 4, 'Algorithms', 'CSCI 2270 and CSCI 2824'),
  ('CSCI3155', 4, 'Principles of Programming Languages', 'CSCI 2270 and CSCI 2400 and CSCI 2824'),
  ('CSCI3308', 3, 'Software Development Methods and Tools', 'CSCI2270'),
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
  ('CSCI2820', 3, 'Linear Algebra with CS Applications', 'none'),
  ('MATH1300', 5, 'Calculus 1', 'MATH 1150'),
  ('MATH2300', 5, 'Calculus 2', 'MATH 1300'),
  ('MATH2130', 3, 'Introduction to Linear Algebra for Non-Mathematics Majors', 'MATH 2300'),
  ('APPM3310', 3, 'Matrix Methods and Applications', 'APPM 2360 or MATH 2400'),
  ('ECEN2703', 3, 'Discrete Mathematics for Computer Engineers', 'CSCI 1300 and MATH 2300'),
  ('APPM3170', 3, 'Discrete Applied Mathematics', 'MATH 2300'),
  ('MATH2001', 3, 'Introduction to Discrete Mathematics', 'MATH 1300'),
  ('APPM3570', 3, 'Applied Probability', 'APPM 2350 or MATH 2400'),
  ('CSCI3022', 3, 'Introduction to Data Science with Probability and Statistics', 'CSCI 2270 and MATH 2300 and CSCI 2824'),
  ('MATH3510', 3, 'Introduction to Probability and Statistics', 'MATH 2300 and MATH 2001'),
  ('ECEN3810', 3, 'Introduction to Probability Theory', 'APPM 2350 or MATH 2400'),
  ('ECON3818', 4, 'Introduction to Statistics with Computer Applications', 'MATH 2300');
  

INSERT INTO users_to_classes
  (username, class_code, grade, semester, current)
VALUES
  ('boab1112', 'CSCI1000', 'A', 'FA24', 1),
  ('boab1121', 'CSCI2000', 'A', 'FA24', 1);