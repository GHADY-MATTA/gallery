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
include 'db.php';
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$title = $data->title;
$description = $data->description;
$tags = $data->tags;

$sql = "UPDATE photos SET title = ?, description = ?, tags = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $title, $description, $tags, $id);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["message" => "Photo updated"]);
