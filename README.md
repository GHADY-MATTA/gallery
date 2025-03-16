adde the pages file to ypur htdocs react folder in my-app
uploadphoto and the storephoto.php / fetchphotos.php directly inside htdocs 


CREATE DATABASE gallerystore;

USE gallerystore;

CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    photo LONGTEXT NOT NULL
);



 past this inside your xamp sql 
populate database 


USE gallerystore; // if needed



INSERT INTO photos (id, username, lastname, photo) 
VALUES
(1, '1231', '23', 'uploadphoto/1231-23-8252.jpeg'),
(2, 'matta', 'matta', 'uploadphoto/matta-matta-5239.jpeg');
