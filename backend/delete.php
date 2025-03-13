<?php

// Allow cross-origin requests
header("Access-Control-Allow-Origin:http://localhost:5173"); // Allow all domains (use specific domain in production)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // If the request is OPTIONS, just return a 200 response to pre-flight requests
    http_response_code(200);
    exit();
}
include 'db.php';include 'db.php';

$id = $_GET['id'];
$sql = "DELETE FROM photos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["message" => "Photo deleted"]);
