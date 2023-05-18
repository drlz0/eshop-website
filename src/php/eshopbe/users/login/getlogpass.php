<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');
header('Content-Type: application/json');

require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\Users;

// Get the login and password from the request body
$login = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

// Establish the database connection
$connector = new DatabaseConnector();
$conn = $connector->getConnection();

// Create a new instance of the Users class
$userClass = new Users();

// Validate the login and password
$loginValid = $userClass->validateLogin($conn, $login, $password);

// Prepare the response
if ($loginValid) {
    $response = [
      'match' => true,
      'message' => 'Login successful',
      'userName' => $userClass->getName() // Include the user's name in the response
    ];
} else {
    $response = [
      'match' => false,
      'message' => 'Invalid login or password',
    ];
}

// Return the response as JSON
echo json_encode($response);

// Close the database connection
$conn->close();
