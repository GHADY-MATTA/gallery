<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin (for development, you can replace * with your frontend URL)
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

// Handle preflight OPTIONS request (needed for CORS with certain HTTP methods like PUT and DELETE)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // End the request here for OPTIONS preflight
}
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $tags = $_POST['tags'];
    $image = $_FILES['image'];

    $imagePath = 'uploads/' . basename($image['name']);
    move_uploaded_file($image['tmp_name'], $imagePath);

    $stmt = $conn->prepare("INSERT INTO photos (title, description, tags, image_path) VALUES (?, ?, ?, ?)");
    $stmt->execute([$title, $description, $tags, $imagePath]);

    echo json_encode(["status" => "success"]);
}
