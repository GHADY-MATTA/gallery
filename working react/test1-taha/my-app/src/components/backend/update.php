<?php
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
