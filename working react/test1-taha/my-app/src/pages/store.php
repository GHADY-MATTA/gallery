<?php
// Step 1: Database connection
$servername = "localhost"; // Your database host (e.g., localhost)
$username = "root"; // Your database username (e.g., root)
$password = ""; // Your database password
$dbname = "employee"; // The database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Handle the form data and file uploads
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form data
    $firstName = $conn->real_escape_string($_POST['firstName']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $dob = $conn->real_escape_string($_POST['dob']);
    $position = $conn->real_escape_string($_POST['position']);
    $startDate = $conn->real_escape_string($_POST['startDate']);
    $coverLetter = $conn->real_escape_string($_POST['coverLetter']);
    $emergencyName = $conn->real_escape_string($_POST['emergencyName']);
    $emergencyPhone = $conn->real_escape_string($_POST['emergencyPhone']);

    // Step 3: Handle file uploads
    $uploadDir = 'uploads/' . $firstName . '_' . $lastName . '/';

    // Create user-specific folder if it doesn't exist
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // File upload paths
    $resumePath = '';
    $medicalReportPath = '';
    $passportPath = '';

    if (isset($_FILES['resume'])) {
        $resumeName = $firstName . '_' . $lastName . '_resume_' . $_FILES['resume']['name'];
        $resumePath = $uploadDir . $resumeName;
        move_uploaded_file($_FILES['resume']['tmp_name'], $resumePath);
    }

    if (isset($_FILES['medicalReport'])) {
        $medicalReportName = $firstName . '_' . $lastName . '_medical_' . $_FILES['medicalReport']['name'];
        $medicalReportPath = $uploadDir . $medicalReportName;
        move_uploaded_file($_FILES['medicalReport']['tmp_name'], $medicalReportPath);
    }

    if (isset($_FILES['passport'])) {
        $passportName = $firstName . '_' . $lastName . '_passport_' . $_FILES['passport']['name'];
        $passportPath = $uploadDir . $passportName;
        move_uploaded_file($_FILES['passport']['tmp_name'], $passportPath);
    }

    // Step 4: Insert data into the database
    $sql = "INSERT INTO employee_onboarding 
            (first_name, last_name, email, phone, dob, position, start_date, cover_letter, emergency_name, emergency_phone, resume_path, medical_report_path, passport_path) 
            VALUES 
            ('$firstName', '$lastName', '$email', '$phone', '$dob', '$position', '$startDate', '$coverLetter', '$emergencyName', '$emergencyPhone', '$resumePath', '$medicalReportPath', '$passportPath')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
