<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Set the upload directory
$upload_directory = '../upload/';
$file_name_array = explode(".", $_FILES['file']['name']);
$file_name = time() . '.' . end($file_name_array);  // Generate a unique file name
$upload_file = $upload_directory . $file_name;  // Path to save the file

// The URL to access the file
$image_link = 'http://localhost/backend-gallery/upload/' . $file_name;  // Fix this URL

// Create the directory if it doesn't exist
if (!file_exists($upload_directory)) {
    mkdir($upload_directory, 0777, true);
}

// Move the uploaded file to the specified directory
if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) {
    echo json_encode([
        'message' => 'File uploaded successfully',
        'image_link' => $image_link
    ]);
} else {
    echo json_encode([
        'message' => 'Failed to upload file'
    ]);
}
