  
USE bingeflix_db;

INSERT INTO Users (userID, name, zipCode, nickName, createdPosts)
VALUES ("joe.brown@email.com", "Joe Brown", "85255", "BigJoe", "The Office Summary", NOW(), NOW()),
("gwhite@email.com", "Greg White", "58975", "JustGreg", "Why Tiger King stinks", NOW(), NOW()),
("tyler@email.com", "Tyler Turner", "85025", "Tylerthecreator", "Is Arrested Development any good", NOW(), NOW());
 
 
INSERT INTO shows (userID, showName, createdPosts)
VALUES ("joe.brown@email.com", "The Office", "The Office Summary")
("gwhite@email.com", "The Office", "The Office Summary")
("tyler@email.com", "Arrested Development", "Is Arrested Development any good?")

INSERT INTO posts (userID, showName, createdPosts, createdComments)
VALUES ("joe.brown@email.com", "The Office", "The Office Summary", "Great Post!")
("gwhite@email.com", "The Office", "The Office Summary", "Great Post!")
("tyler@email.com", "Arrested Development", "Is Arrested Development any good?", "Great Post!")

