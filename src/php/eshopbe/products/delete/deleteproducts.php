<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');

require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\Product;

// Retrieve the request payload
$data = json_decode(file_get_contents('php://input'), true); // Decode the JSON payload

// Establish the database connection
$connector = new DatabaseConnector();
$conn = $connector->getConnection();

// Call to delete
$productClass = new Product();
$productClass->deleteProducts($conn, $data['skusToDelete']);

$conn->close();
