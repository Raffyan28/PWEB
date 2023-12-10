<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection details
$host = 'localhost';
$user = 'root';
$pwd = '';
$dbname = 'Pert4_db';

$conn = new mysqli($host, $user, $pwd, $dbname);

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

// Function to create a new data
function createData($data)
{
    global $conn;

    $nama = $data['nama'];
    $npm = $data['npm'];
    $kelas = $data['kelas'];

    $stmt = $conn->prepare("INSERT INTO mahasiswa (nama, npm, kelas) VALUES (?, ?, ?)");

    if (!$stmt) {
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to prepare statement']));
    }

    $stmt->bind_param("sss", $nama, $npm, $kelas);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to execute statement']));
    }
}

// Function to retrieve all data
function getData()
{
    global $conn;

    try {
        $result = $conn->query("SELECT id, nama, npm, kelas FROM mahasiswa");
        $data = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => $e->getMessage()]));
    }
}

// Function to update existing data
function updateData($id, $data)
{
    global $conn;

    $nama = $data['nama'];
    $npm = $data['npm'];
    $kelas = $data['kelas'];

    $stmt = $conn->prepare("UPDATE mahasiswa SET nama=?, npm=?, kelas=? WHERE id=?");

    if (!$stmt) {
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to prepare statement']));
    }

    $stmt->bind_param("sssi", $nama, $npm, $kelas, $id);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to execute statement']));
    }
}

// Function to delete data
function deleteData($id)
{
    global $conn;

    $stmt = $conn->prepare("DELETE FROM mahasiswa WHERE id=?");

    if (!$stmt) {
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to prepare statement']));
    }

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Failed to execute statement']));
    }
}

// Check the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handling different HTTP methods
switch ($method) {
    case 'GET':
        $data = getData();
        header('Content-Type: application/json');
        echo json_encode($data);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (createData($data)) {
            echo json_encode(['message' => 'Data created successfully']);
        }
        break;

    case 'PUT':
        $id = $_GET['id'];
        $data = json_decode(file_get_contents("php://input"), true);
        if (updateData($id, $data)) {
            echo json_encode(['message' => 'Data updated successfully']);
        }
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $deleteData);
        $id = $deleteData['id'];
        if (deleteData($id)) {
            echo json_encode(['message' => 'Data deleted successfully']);
        }
        break;

    default:
        http_response_code(405); // Method Not Allowed
        break;
}
?>