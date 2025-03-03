CREATE DATABASE applicationDB;

USE applicationDB

CREATE TABLE `psychologists` (
  `id` CHAR(36) NOT NULL,
  `fullName` VARCHAR(200) NOT NULL,
  `sigla` VARCHAR(15) NOT NULL,
  `document` CHAR(50) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `presentation` VARCHAR(1000) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `patients` (
  `id` CHAR(36) NOT NULL,
  `fullName` VARCHAR(200) NOT NULL,
  `phone` CHAR(11) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `cpf` CHAR(11) UNIQUE NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `services` (
  `id` CHAR(36) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `observation` VARCHAR(500) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `patient_id` CHAR(36) NOT NULL,
  `psychologist_id` CHAR(36) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`),
  CONSTRAINT `fk_services_patientes`
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_services_psychologists`
    FOREIGN KEY (`psychologist_id`) REFERENCES `psychologists`(`id`)
    ON DELETE CASCADE
)

DROP TABLE `psychologists`;
DROP TABLE `patients`;
DROP TABLE `services`;

SELECT * FROM `services` 
JOIN `psychologists` `psychologist` ON `services`.`psychologist_id` = `psychologist`.`id`
WHERE `services`.`psychologist_id`= "0381a19c-83b6-4872-8a95-51d52d0517bf";

SELECT * FROM `services`
  WHERE `createdAt` BETWEEN "2025-02-21, 00:00:00" AND "2025-02-21, 23:59:59";
