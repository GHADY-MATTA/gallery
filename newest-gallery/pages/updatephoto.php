<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to MySQL database
$conn = new mysqli("localhost", "root", "", "gallerystore");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"], $data["username"], $data["lastName"], $data["image"])) {
    die(json_encode(["error" => "Missing required fields"]));
}

$id = $conn->real_escape_string($data["id"]);
$username = $conn->real_escape_string($data["username"]);
$lastname = $conn->real_escape_string($data["lastName"]);
$imageData = $data["image"];

// Extract Base64 data & file extension
if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {
    $extension = $matches[1]; // Extracts "jpg", "png", etc.
    $imageData = substr($imageData, strpos($imageData, ',') + 1);
    $imageData = base64_decode($imageData);
} else {
    die(json_encode(["error" => "Invalid image format"]));
}

// Create upload directory if not exists
$uploadDir = "uploadphoto/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Generate filename: username-lastname-XXXX.ext
$randomNumber = rand(1000, 9999);
$fileName = $uploadDir . "{$username}-{$lastname}-{$randomNumber}.{$extension}";

// Save image file
if (!file_put_contents($fileName, $imageData)) {
    die(json_encode(["error" => "Failed to save image"]));
}

// Update database record
$sql = "UPDATE photos SET username='$username', lastname='$lastname', photo='$fileName' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => "Photo updated successfully", "filePath" => $fileName]);
} else {
    echo json_encode(["error" => "Database error: " . $conn->error]);
}

$conn->close();
