<?php
include 'db.php';

$id = $_GET['id'];
$sql = "DELETE FROM photos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(["message" => "Photo deleted"]);
