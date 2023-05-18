<?php

header('Access-Control-Allow-Origin: https://super-eshop.000webhostapp.com');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, access-control-allow-headers');

require __DIR__ . '/../../vendor/autoload.php';

use eshopbe\src\classes\DatabaseConnector;
use eshopbe\src\classes\ProductFactory;
use eshopbe\src\classes\Product;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // The code for handling form submission and inserting data goes here
    // Retrieve the data sent from JavaScript
    $data = json_decode(file_get_contents('php://input'), true);


    // Extract the product data
    $sku = $data['sku'];
    $name = $data['name'];
    $price = $data['price'];
    $productType = $data['productType'];

    // Establish the database connection
    $connector = new DatabaseConnector();
    $conn = $connector->getConnection();

    // Instantiate Product class
    $productClass = new Product($sku, $name, $price, $productType);

    if (!$productClass->skuExistsInDatabase($conn, $sku)) {
        $productClass->saveMainProductToDatabase($conn);
    }

    // Use a factory to create the appropriate product object
    $product = ProductFactory::createProduct($productType, $data);

    if ($product) {
        // Insert the subproduct data into the respective table
        $product->saveSubProductToDatabase($conn);
    } else {
        echo 'Invalid product type';
    }

    $conn->close();
}
