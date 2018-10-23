CREATE TABLE IF NOT EXISTS users (
	user_id text NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	email text NOT NULL,
    PRIMARY KEY(user_id)
);
CREATE TABLE IF NOT EXISTS relationships (
    user_one_id text,
    user_two_id text,
    frequency int NOT NULL,
    PRIMARY KEY (user_one_id, user_two_id)
    FOREIGN KEY (user_one_id) REFERENCES user(user_id),
    FOREIGN KEY (user_two_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS convos (
    conv_id int PRIMARY KEY,
    user_one text,
    user_two text NOT NULL,
    convoType text NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
    event_id int PRIMARY KEY,
    event_name text NOT NULL,
    event_location text NOT NULL
);
INSERT INTO users (user_id, first_name, last_name, email) VALUES 
('1A', 'Steven', 'Chen', 'schen@loyalty.com'),
('2B', 'Tej', 'Baga', 'tbaga@loyalty.com'),
('3C', 'Anders', 'Lam', 'alam@loyalty.com'),
('4D', 'Elias', 'Ali', 'eali@loyalty.com');

INSERT INTO relationships (user_one_id, user_two_id, frequency) VALUES
('1A', '2B', 1),
('1A', '3C', 1),
('1A', '4D', 1),
('2B', '3C', 1);