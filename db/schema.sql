DROP DATABASE IF EXISTS workouts_db;

CREATE DATABASE workouts_db;

USE workouts_db;


CREATE TABLE workouts (
  id INT AUTO_INCREMENT NOT NULL ,
  workout_name VARCHAR(255) NOT NULL,
  crushed TINYINT (1) NOT NULL, 
  PRIMARY KEY (id)
);