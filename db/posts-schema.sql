DROP DATABASE IF EXISTS bingeflix_db;
CREATE DATABASE bingeflix_db;

USE bingeflix_db;

CREATE TABLE posts (
     primary_key_column datatype PRIMARY KEY,
    shows VARCHAR(100) NOT NULL,
    showsImage 
    showsPlot VARCHAR(250) NOT NULL,
    showsYear INT NOT NULL 
    FOREIGN KEY shows, 
)