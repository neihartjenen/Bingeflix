DROP DATABASE IF EXISTS bingeflix_db;
CREATE DATABASE bingeflix_db;

USE bingeflix_db;

CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY (id)
);

CREATE TABLE shows (
    primary_key_column datatype PRIMARY KEY,
    shows VARCHAR(100) NOT NULL,
    showsImage INT, 
    showsPlot VARCHAR(250) NOT NULL,
    showsYear INT NOT NULL 
    PRIMARY KEY (id)
)

CREATE TABLE posts (
     primary_key_column datatype PRIMARY KEY,
    shows VARCHAR(100) NOT NULL,
    showsImage 
    showsPlot VARCHAR(250) NOT NULL,
    showsYear INT NOT NULL 
    PRIMARY KEY (id)
    FOREIGN KEY shows, 
)

SELECT * FROM shows;
select * from posts;
