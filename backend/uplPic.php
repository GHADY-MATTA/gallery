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
} else {
    echo "ure in php";}


// Define the upload directory and image name
$uploadDir = 'uploads/';  // Make sure this folder exists and is writable
$imageName = basename($_FILES['photo']['name']);  // Get the file name

// Check if an image is uploaded
if (isset($_FILES['photo'])) {
    $image = $_FILES['photo'];

    // Check if the file is an image (optional)
    if (getimagesize($image['tmp_name'])) {
        // Save the image to the uploads directory
        $uploadPath = $uploadDir . $imageName;

        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($image['tmp_name'], $uploadPath)) {
            // Read the image file content as binary data
            $imageData = file_get_contents($uploadPath);

            /// Prepare and execute the database insert statement
$stmt = $conn->prepare("INSERT INTO gallerys (photos) VALUES (?)");
$stmt->bind_param("b", $imageData); // Use "b" for binary (BLOB)
$stmt->send_long_data(0, $imageData); // Send the binary data to the database

            if ($stmt->execute()) {
                echo "Image uploaded successfully!";
            } else {
                echo "Failed to insert image into database: " . $stmt->error;
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            echo "Failed to save the image.";
        }
    } else {
        echo "Please upload a valid image.";
    }
} else {
    echo "No image file received.";
}

// Close the database connection
$conn->close();
