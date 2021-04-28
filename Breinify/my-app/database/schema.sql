DROP DATABASE IF EXISTS doggos;

CREATE DATABASE doggos;

USE doggos;

CREATE TABLE goodBoys (
  id INT NOT NULL AUTO_INCREMENT,
  card_name VARCHAR(50),
  card_description VARCHAR(1000),
  creationtime VARCHAR(50),
  PRIMARY KEY (id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < database/schema.sql
 *  to create the database and the tables.*/

