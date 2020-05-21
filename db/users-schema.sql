DROP DATABASE IF EXISTS bingeflix_db;
CREATE DATABASE bingeflix_db;

USE bingeflix_db;

CREATE TABLE Users (
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY (email)
);