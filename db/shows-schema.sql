DROP DATABASE IF EXISTS bingeflix_db;
CREATE DATABASE bingeflix_db;
USE bingeflix_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY (id)
);

CREATE TABLE shows(
id INT NOT NULL AUTO_INCREMENT,
showsID INT NOT NULL,
showsName VARCHAR (100) NOT NULL,
showsPlot VARCHAR (150) NOT NULL,
showsYear INT (4) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE posts(
id INT NOT NULL AUTO_INCREMENT,
postsID INT NOT NULL,
posts VARCHAR (150) NOT NULL,
PRIMARY KEY (id)
);
