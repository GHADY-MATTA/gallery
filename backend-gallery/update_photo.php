<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $put_data);
    $id = $put_data['id'];
    $title = $put_data['title'];
    $description = $put_data['description'];
    $tags = $put_data['tags'];

    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];
        $imagePath = 'uploads/' . basename($image['name']);
        move_uploaded_file($image['tmp_name'], $imagePath);
        $stmt = $conn->prepare("UPDATE photos SET title=?, description=?, tags=?, image_path=? WHERE id=?");
        $stmt->execute([$title, $description, $tags, $imagePath, $id]);
    } else {
        $stmt = $conn->prepare("UPDATE photos SET title=?, description=?, tags=? WHERE id=?");
        $stmt->execute([$title, $description, $tags, $id]);
    }

    echo json_encode(["status" => "success"]);
}
