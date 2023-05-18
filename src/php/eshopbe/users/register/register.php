<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');
header('Content-Type: application/json');

require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\Users;

// Get the posted form data
$name = $_POST['name'];
$login = $_POST['login'];
$password = $_POST['password'];

// Hash the password for security
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Establish the database connection
$connector = new DatabaseConnector();
$conn = $connector->getConnection();

$userClass = new Users($name, $login, $hashedPassword);

if (!$userClass->loginExistsInDatabase($conn, $login)) {
    $success = $userClass->saveUserToDatabase($conn);
    if ($success) {
        echo json_encode(array("message" => "User registered successfully."));
    } else {
        echo json_encode(array("error" => "Failed to register the userPHP: "));
    }
} else {
    echo json_encode(array("message" => "Login Already Taken"));
}

$conn->close();
