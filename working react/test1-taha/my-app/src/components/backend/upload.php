<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $tags = $_POST['tags'];

    $target_dir = "../uploads/";
    $file_name = basename($_FILES["file"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $stmt = $conn->prepare("INSERT INTO photos (title, description, tags, filename) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $title, $description, $tags, $file_name);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Upload successful!"]);
        } else {
            echo json_encode(["error" => "Upload failed"]);
        }
        $stmt->close();
    }
    $conn->close();
}
