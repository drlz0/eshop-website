<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');

require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\Product;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the data sent from JavaScript
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract the SKU
    $sku = $data['sku'];

    // Establish the database connection
    $connector = new DatabaseConnector();
    $conn = $connector->getConnection();

    // Check if SKU exists
    $productClass = new Product($sku);
    $skuExists = $productClass->skuExistsInDatabase($conn, $sku);

    // Send the response
    echo json_encode(['skuExists' => $skuExists]);

    $conn->close();
}
