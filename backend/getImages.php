<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allow all origins or specify your React app URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers (Content-Type)

// Database connection parameters
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "gallery"; // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch image data
$sql = "SELECT photos FROM gallerys"; // Assuming 'gallerys' is the table name and 'photos' is the column storing the image data
$result = $conn->query($sql);

$images = []; // Array to hold image data

if ($result->num_rows > 0) {
    // Fetch each row
    while ($row = $result->fetch_assoc()) {
        // Convert binary data to base64 for display in an <img> tag
        $imageData = base64_encode($row['photos']);
        $imageSrc = 'data:image/jpeg;base64,' . $imageData; // Assuming the images are JPEG. Adjust if needed

        // Store image source (base64 encoded)
        $images[] = $imageSrc;
    }

    // Send the image data as a JSON response
    echo json_encode(['images' => $images]);
} else {
    echo json_encode(['images' => []]); // Return an empty array if no images are found
}

// Close the database connection
$conn->close();
