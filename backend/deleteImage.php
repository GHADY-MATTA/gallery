<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; // Change if needed
$password = ""; // Change if needed
$dbname = "gallery";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if required data is received
if (!isset($data['id']) || !isset($data['filename'])) {
    echo json_encode(["message" => "Missing image ID or filename"]);
    exit;
}

$id = intval($data['id']);
$filename = basename($data['filename']); // Prevent directory traversal attacks
$imagePath = "uploads/" . $filename; // Change path as needed

// Delete the image file from the server
if (file_exists($imagePath)) {
    unlink($imagePath);
}

// Delete the image record from the database
$sql = "DELETE FROM gallerys WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Image deleted successfully"]);
} else {
    echo json_encode(["message" => "Failed to delete image"]);
}

// Close database connection
$stmt->close();
$conn->close();
