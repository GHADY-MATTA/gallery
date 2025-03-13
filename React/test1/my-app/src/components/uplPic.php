<?php
// Database connection (update with your actual database credentials)
$pdo = new PDO('mysql:host=localhost;dbname=your_database', 'username', 'password');

// Check if an image is uploaded
if (isset($_FILES['photo'])) {
    // Get the uploaded image file details
    $image = $_FILES['photo'];

    // Check if the file is an image (optional)
    if (getimagesize($image['tmp_name'])) {
        // Read the image file content as binary data
        $imageData = file_get_contents($image['tmp_name']);

        // Prepare and execute the database insert statement
        $stmt = $pdo->prepare("INSERT INTO gallery (photos) VALUES (:photos)");
        $stmt->bindParam(':photos', $imageData, PDO::PARAM_LOB);
        $stmt->execute();

        // Respond back to the client
        echo "Image uploaded successfully!";
    } else {
        echo "Please upload a valid image.";
    }
} else {
    echo "No image file received.";
}
