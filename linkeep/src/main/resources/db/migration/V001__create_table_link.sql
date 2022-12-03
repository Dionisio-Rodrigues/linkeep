CREATE TABLE IF NOT EXISTS `Link` (
    `id` INTEGER  PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `url` VARCHAR(255)  NOT NULL,
    `icon_url` VARCHAR(255)  NOT NULL,
    `user_id` INTEGER  NOT NULL,
    CONSTRAINT `FK_USER` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);