CREATE TABLE user_account (
	id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    pw CHAR(32) NOT NULL,
    clinic_name VARCHAR(300) NOT NULL,
    phone VARCHAR(8) NOT NULL,
    address VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE consult_record (
	id int NOT NULL AUTO_INCREMENT,
    clinic_id INT NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    patient VARCHAR(100) NOT NULL,
    diagnosis VARCHAR(50) NOT NULL,
    medication VARCHAR(50) NOT NULL,
    consult_fee DOUBLE NOT NULL,
    date_time DATETIME NOT NULL,
    has_follow_up BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);