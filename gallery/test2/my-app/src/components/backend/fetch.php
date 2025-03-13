<?php
include 'db.php';

$sql = "SELECT * FROM photos ORDER BY uploaded_at DESC";
$result = $conn->query($sql);

$photos = [];
while ($row = $result->fetch_assoc()) {
    $photos[] = $row;
}

echo json_encode($photos);
