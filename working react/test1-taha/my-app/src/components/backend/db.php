<?php
$host = "localhost";
$user = "root";  // Change if you set a MySQL password
$password = "";
$database = "gallery";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
