<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allow all origins or specify your React app URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers (Content-Type)

$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "gallery"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle OPTIONS request for pre-flight CORS check
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    // End the script after sending headers for pre-flight request
    exit;
}

// Get the username from POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $lastname = $_POST['lastname'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username,lastname) VALUES (?,?)");
    $stmt->bind_param("ss", $user,$lastname);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User saved successfully!"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
