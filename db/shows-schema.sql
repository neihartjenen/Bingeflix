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
PRIMARY KEY (id),
FOREIGN KEY (shows) REFERENCES shows(showsID)
);



// testing
//testing something 


INSERT INTO users (id, email, password, createdAt, updatedAt)
VALUES ("joe.brown@email.com", "Joe Brown", "85255", "BigJoe", "The Office Summary"
("gwhite@email.com", "Greg White", "58975", "JustGreg", "Why Tiger King stinks")
("tyler@email.com", "Tyler Turner", "85025", "Tylerthecreator", "Is Arrested Development any good")
 
 
INSERT INTO shows (userID, showName, createdPosts)
VALUES ("joe.brown@email.com", "The Office", "The Office Summary")
("gwhite@email.com", "The Office", "The Office Summary")
("tyler@email.com", "Arrested Development", "Is Arrested Development any good?")

INSERT INTO posts (userID, showName, createdPosts, createdComments)
VALUES ("joe.brown@email.com", "The Office", "The Office Summary", "Great Post!")
("gwhite@email.com", "The Office", "The Office Summary", "Great Post!")
("tyler@email.com", "Arrested Development", "Is Arrested Development any good?", "Great Post!")
SELECT * FROM shows;
select * from posts;