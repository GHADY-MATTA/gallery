<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Step 1: Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "employee";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Return complete employee data for the given id
    if (isset($_GET['id'])) {
        $userId = intval($_GET['id']);
        $sql = "SELECT * FROM employee_onboarding WHERE id = $userId";
        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    } else {
        echo json_encode(["error" => "No user id provided"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the user id
    $userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
    if ($userId <= 0) {
        echo json_encode(["error" => "Invalid user id"]);
        exit;
    }

    // Fetch current record data so we can use current values if new ones aren't provided
    $sqlSelect = "SELECT * FROM employee_onboarding WHERE id = $userId";
    $result = $conn->query($sqlSelect);
    if ($result && $result->num_rows > 0) {
        $currentData = $result->fetch_assoc();
    } else {
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    // For each text field, use the new value if provided and not empty; otherwise, keep the current value.
    $firstName = (isset($_POST['firstName']) && trim($_POST['firstName']) !== '')
        ? $conn->real_escape_string($_POST['firstName'])
        : $currentData['first_name'];
    $lastName = (isset($_POST['lastName']) && trim($_POST['lastName']) !== '')
        ? $conn->real_escape_string($_POST['lastName'])
        : $currentData['last_name'];
    $email = (isset($_POST['email']) && trim($_POST['email']) !== '')
        ? $conn->real_escape_string($_POST['email'])
        : $currentData['email'];
    $phone = (isset($_POST['phone']) && trim($_POST['phone']) !== '')
        ? $conn->real_escape_string($_POST['phone'])
        : $currentData['phone'];
    $dob = (isset($_POST['dob']) && trim($_POST['dob']) !== '')
        ? $conn->real_escape_string($_POST['dob'])
        : $currentData['dob'];
    $position = (isset($_POST['position']) && trim($_POST['position']) !== '')
        ? $conn->real_escape_string($_POST['position'])
        : $currentData['position'];
    $startDate = (isset($_POST['startDate']) && trim($_POST['startDate']) !== '')
        ? $conn->real_escape_string($_POST['startDate'])
        : $currentData['start_date'];
    $coverLetter = (isset($_POST['coverLetter']) && trim($_POST['coverLetter']) !== '')
        ? $conn->real_escape_string($_POST['coverLetter'])
        : $currentData['cover_letter'];
    $emergencyName = (isset($_POST['emergencyName']) && trim($_POST['emergencyName']) !== '')
        ? $conn->real_escape_string($_POST['emergencyName'])
        : $currentData['emergency_name'];
    $emergencyPhone = (isset($_POST['emergencyPhone']) && trim($_POST['emergencyPhone']) !== '')
        ? $conn->real_escape_string($_POST['emergencyPhone'])
        : $currentData['emergency_phone'];

    // Use current file paths as defaults for file fields
    $resumePath = $currentData['resume_path'];
    $medicalReportPath = $currentData['medical_report_path'];
    $passportPath = $currentData['passport_path'];

    // Determine the upload directory using updated first and last names
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/' . $firstName . '_' . $lastName . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Process file uploads only if new file is provided.
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == 0) {
        $resumeName = $firstName . '_' . $lastName . '_resume_' . basename($_FILES['resume']['name']);
        $newResumePath = $uploadDir . $resumeName;
        if (move_uploaded_file($_FILES['resume']['tmp_name'], $newResumePath)) {
            $resumePath = $newResumePath;
        }
    }
    if (isset($_FILES['medicalReport']) && $_FILES['medicalReport']['error'] == 0) {
        $medicalReportName = $firstName . '_' . $lastName . '_medical_' . basename($_FILES['medicalReport']['name']);
        $newMedicalReportPath = $uploadDir . $medicalReportName;
        if (move_uploaded_file($_FILES['medicalReport']['tmp_name'], $newMedicalReportPath)) {
            $medicalReportPath = $newMedicalReportPath;
        }
    }
    if (isset($_FILES['passport']) && $_FILES['passport']['error'] == 0) {
        $passportName = $firstName . '_' . $lastName . '_passport_' . basename($_FILES['passport']['name']);
        $newPassportPath = $uploadDir . $passportName;
        if (move_uploaded_file($_FILES['passport']['tmp_name'], $newPassportPath)) {
            $passportPath = $newPassportPath;
        }
    }

    // Build the update query using the final values
    $sqlUpdate = "UPDATE employee_onboarding SET 
                    first_name = '$firstName',
                    last_name = '$lastName',
                    email = '$email',
                    phone = '$phone',
                    dob = '$dob',
                    position = '$position',
                    start_date = '$startDate',
                    cover_letter = '$coverLetter',
                    emergency_name = '$emergencyName',
                    emergency_phone = '$emergencyPhone',
                    resume_path = '$resumePath',
                    medical_report_path = '$medicalReportPath',
                    passport_path = '$passportPath'
                  WHERE id = $userId";

    if ($conn->query($sqlUpdate) === TRUE) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        echo json_encode(["error" => "Update failed: " . $conn->error]);
    }
}

$conn->close();
