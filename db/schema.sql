DROP DATABASE IF EXISTS bingeflix_db;
CREATE DATABASE  bingeflix_db;

USE bingeflix_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE shows (
    primary_key_column datatype PRIMARY KEY,
    shows VARCHAR(100) NOT NULL,
    showsImage INT, 
    showsPlot VARCHAR(250) NOT NULL,
    showsYear INT NOT NULL 
)

CREATE TABLE posts (
     primary_key_column datatype PRIMARY KEY,
    shows VARCHAR(100) NOT NULL,
    showsImage 
    showsPlot VARCHAR(250) NOT NULL,
    showsYear INT NOT NULL 
)
