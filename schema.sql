DROP DATABASE IF EXISTS book_club_db;
CREATE DATABASE book_club_db;
USE book_club_db;

###########################
###    CREATE TABLES    ###
###########################
CREATE TABLE user_profile (
	id INT AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE,
    password_hash CHAR(128) NOT NULL,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

-- CREATE TABLE book (
-- 	id INT AUTO_INCREMENT,
--     title VARCHAR(256) NOT NULL,
--     sub_title VARCHAR(256),
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE author (
-- 	id INT AUTO_INCREMENT,
-- 	first_name VARCHAR(30) NOT NULL,
-- 	middle_name VARCHAR(30),
-- 	last_name VARCHAR(30) NOT NULL,
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE book_author (
--     book_id INT,
-- 	author_id INT,
--     PRIMARY KEY (book_id, author_id),
-- 	FOREIGN KEY (book_id)
-- 		REFERENCES book(id)
--         ON DELETE RESTRICT,
-- 	FOREIGN KEY (author_id)
-- 		REFERENCES author(id)
--         ON DELETE RESTRICT
-- );

CREATE TABLE user_book_list (
	user_id INT,
    book_id INT,
    compleated BOOL DEFAULT false,
    ranking FLOAT,
    PRIMARY KEY (user_id, book_id),
	FOREIGN KEY (user_id)
		REFERENCES user_profile(id)
        ON DELETE RESTRICT -- ,
-- 	FOREIGN KEY (book_id)
-- 		REFERENCES book(id)
--         ON DELETE RESTRICT
);

CREATE TABLE user_comment (
	id INT AUTO_INCREMENT,
    timestamp TIMESTAMP NOT NULL,
	user_id INT,
    book_id INT,
    text BLOB NOT NULL,
    parent_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id)
		REFERENCES user_profile(id)
        ON DELETE RESTRICT,
--	FOREIGN KEY (book_id)
--		REFERENCES book(id)
--      ON DELETE RESTRICT,
	FOREIGN KEY (parent_id)
		REFERENCES user_comment(id)
        ON DELETE RESTRICT
);

-- CREATE TABLE discussion_group (
-- 	id INT AUTO_INCREMENT,
--     name VARCHAR(35),
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE group_user (
-- 	user_id INT,
-- 	group_id INT,
--     PRIMARY KEY (user_id, group_id),
-- 	FOREIGN KEY (user_id)
-- 		REFERENCES user_profile(id)
--         ON DELETE RESTRICT,
-- 	FOREIGN KEY (group_id)
-- 		REFERENCES discussion_group(id)
--         ON DELETE RESTRICT
-- );

-- CREATE TABLE discussion (
-- 	id INT AUTO_INCREMENT,
-- 	group_id INT,
--     book_id INT,
--     start_date DATE,
--     end_date DATE,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (group_id)
-- 		REFERENCES discussion_group(id)
--         ON DELETE RESTRICT,
-- 	FOREIGN KEY (book_id)
-- 		REFERENCES book(id)
--         ON DELETE RESTRICT
-- );

-- CREATE TABLE discussion_log (
-- 	id INT AUTO_INCREMENT,
--     timestamp TIMESTAMP NOT NULL,
-- 	user_id INT,
--     discussion_id INT,
--     text BLOB NOT NULL,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (user_id)
-- 		REFERENCES user_profile(id)
--         ON DELETE RESTRICT,
-- 	FOREIGN KEY (discussion_id)
-- 		REFERENCES discussion(id)
--         ON DELETE RESTRICT
-- );