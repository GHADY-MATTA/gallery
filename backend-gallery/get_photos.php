<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // End the request here for OPTIONS preflight
}

include 'db.php';

// Query photos from the database
$stmt = $conn->query("SELECT * FROM photos");
$photos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Add base URL for images
foreach ($photos as &$photo) {
    $photo['image_path'] = 'http://localhost/backend-gallery/uploads/' . $photo['image_path'];
}

// Return JSON response
echo json_encode($photos);
