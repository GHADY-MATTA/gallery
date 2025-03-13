<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "photo_gallery";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Define the upload directory (using 'upload1')
$uploadDir = __DIR__ . '/upload1/'; // Absolute path to the upload1 folder

// Ensure the upload1 directory exists, create it if it doesn't
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true); // Create folder 'upload1' if it doesn't exist
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $tags = $_POST['tags'] ?? '';

    // Ensure the file is uploaded correctly
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageTmpPath = $_FILES['image']['tmp_name'];
        $imageName = basename($_FILES['image']['name']); // Get the filename

        // Set the upload path for the file inside 'upload1'
        $uploadPath = $uploadDir . $imageName;

        // Move the file to the upload1 directory
        if (move_uploaded_file($imageTmpPath, $uploadPath)) {
            // Prepare SQL query to insert data into the database
            $stmt = $conn->prepare("INSERT INTO photos (title, description, tags, image_path) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $title, $description, $tags, $uploadPath);

            // Execute the query and check if it was successful
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Image uploaded successfully!"]);
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Failed to save the image to the upload1 folder."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid image upload or missing file."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
