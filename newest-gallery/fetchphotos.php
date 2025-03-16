<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to MySQL database
$conn = new mysqli("localhost", "root", "", "gallerystore");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Query the photos table for all records
$sql = "SELECT id, username, lastname, photo FROM photos";
$result = $conn->query($sql);

$photos = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $photos[] = $row;
    }
}

// Return the photos as JSON
echo json_encode($photos);

$conn->close();
