CREATE TABLE Program
(
  Name VARCHAR NOT NULL,
  Management VARCHAR NOT NULL,
  Program_ID INT NOT NULL,
  PRIMARY KEY (Program_ID)
);

CREATE TABLE Researcher
(
  First_Name VARCHAR NOT NULL,
  Date_Of_Birth DATE NOT NULL,
  Last_Name VARCHAR NOT NULL,
  Gender VARCHAR NOT NULL,
  Researcher_ID INT NOT NULL,
  PRIMARY KEY (Researcher_ID)
);

CREATE TABLE Delivered_work
(
  Title VARCHAR NOT NULL,
  Summary VARCHAR NOT NULL,
  Work_ID INT NOT NULL,
  Delivry_Date DATE NOT NULL,
  PRIMARY KEY (Work_ID)
);

CREATE TABLE Organisation
(
  Name VARCHAR NOT NULL,
  Street VARCHAR NOT NULL,
  Postal_Code INT NOT NULL,
  City VARCHAR NOT NULL,
  Abbreviation VARCHAR NOT NULL,
  Organisation_ID INT NOT NULL,
  PRIMARY KEY (Organisation_ID)
);

CREATE TABLE Scientific_Field
(
  Name VARCHAR NOT NULL,
  Field_ID INT NOT NULL,
  PRIMARY KEY (Field_ID)
);

CREATE TABLE Executive
(
  Name VARCHAR NOT NULL,
  Executive_ID INT NOT NULL,
  PRIMARY KEY (Executive_ID)
);

CREATE TABLE Company
(
  Equity FLOAT NOT NULL,
  Company_ID INT NOT NULL,
  Organisation_ID INT NOT NULL,
  PRIMARY KEY (Company_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID)
);

CREATE TABLE University
(
  Estimated_Budget_by_Education_Ministry FLOAT NOT NULL,
  University_ID INT NOT NULL,
  Organisation_ID INT NOT NULL,
  PRIMARY KEY (University_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID)
);

CREATE TABLE Reaserch_Center
(
  Estimated_Budget_by_Education_Ministry FLOAT NOT NULL,
  Estimated_Budget_by_Private_Actions FLOAT NOT NULL,
  Center_ID INT NOT NULL,
  Organisation_ID INT NOT NULL,
  PRIMARY KEY (Center_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID)
);

CREATE TABLE Phone
(
  Phone INT NOT NULL,
  Organisation_ID INT NOT NULL,
  PRIMARY KEY (Phone, Organisation_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID)
);

CREATE TABLE Relationship
(
  Date DATE NOT NULL,
  Organisation_ID INT NOT NULL,
  Researcher_ID INT NOT NULL,
  PRIMARY KEY (Organisation_ID, Researcher_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID),
  FOREIGN KEY (Researcher_ID) REFERENCES Researcher(Researcher_ID)
);

CREATE TABLE Project
(
  Title VARCHAR NOT NULL,
  Summary VARCHAR NOT NULL,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Amount FLOAT NOT NULL,
  Project_ID INT NOT NULL,
  Executive_ID INT NOT NULL,
  Organisation_ID INT NOT NULL,
  Program_ID INT NOT NULL,
  Researcher_ID INT NOT NULL,
  PRIMARY KEY (Project_ID),
  FOREIGN KEY (Executive_ID) REFERENCES Executive(Executive_ID),
  FOREIGN KEY (Organisation_ID) REFERENCES Organisation(Organisation_ID),
  FOREIGN KEY (Program_ID) REFERENCES Program(Program_ID),
  FOREIGN KEY (Researcher_ID) REFERENCES Researcher(Researcher_ID)
);

CREATE TABLE Review
(
  Grade FLOAT NOT NULL,
  Date DATE NOT NULL,
  Review_ID INT NOT NULL,
  Project_ID INT NOT NULL,
  Researcher_ID INT NOT NULL,
  PRIMARY KEY (Review_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Researcher_ID) REFERENCES Researcher(Researcher_ID)
);

CREATE TABLE Delivery
(
  Date DATE NOT NULL,
  Project_ID INT NOT NULL,
  Work_ID INT NOT NULL,
  PRIMARY KEY (Project_ID, Work_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Work_ID) REFERENCES Delivered_work(Work_ID)
);

CREATE TABLE Belongs_to_field
(
  Field_ID INT NOT NULL,
  Project_ID INT NOT NULL,
  FOREIGN KEY (Field_ID) REFERENCES Scientific_Field(Field_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
);

CREATE TABLE Project_Researcher
(
  Project_ID INT NOT NULL,
  Researcher_ID INT NOT NULL,
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Researcher_ID) REFERENCES Researcher(Researcher_ID)
);