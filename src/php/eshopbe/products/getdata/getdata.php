<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
//header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');
header('Access-Control-Allow-Headers: Access-Control-Request-Headers, Access-Control-Request-Method, Origin, X-Requested-With, Content-Type, access-control-allow-headers');


require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\Product;

// Establish the database connection
$connector = new DatabaseConnector();
$conn = $connector->getConnection();

$productClass = new Product();
$data = $productClass->getData($conn);

// Return the data as JSON response
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
