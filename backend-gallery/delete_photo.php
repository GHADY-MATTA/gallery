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

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $del_data);
    $id = $del_data['id'];

    $stmt = $conn->prepare("DELETE FROM photos WHERE id=?");
    $stmt->execute([$id]);

    echo json_encode(["status" => "success"]);
}
