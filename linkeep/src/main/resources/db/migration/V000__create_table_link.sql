CREATE TABLE IF NOT EXISTS link (
    id BIGINT  PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    url VARCHAR(255)  NOT NULL,
    icon_url VARCHAR(255)  NOT NULL,
    user_id VARCHAR(50)  NOT NULL
);