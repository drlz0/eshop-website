<?php

namespace eshopbe\src\classes;

class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $productType;

    public function __construct($sku = null, $name = null, $price = null, $productType = null)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productType = $productType;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setProductType($productType)
    {
        $this->productType = $productType;
    }

    public function getProductType()
    {
        return $this->productType;
    }

    // Does sku already exits in database?
    public function skuExistsInDatabase($conn, $sku)
    {
        // Check if SKU exists in the database
        $sql = "SELECT sku FROM products WHERE sku = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $sku);
        $stmt->execute();
        $stmt->store_result();
        $count = $stmt->num_rows;
        $stmt->close();

        return $count > 0;
    }

    public function saveMainProductToDatabase($conn)
    {
        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, product_type) VALUES (?, ?, ?, ?)");
    
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $productType = $this->getProductType();
    
        $stmt->bind_param('ssds', $sku, $name, $price, $productType);
    
        if ($stmt->execute()) {
            echo 'Product saved to the database successfully!';
        } else {
            echo 'Failed to save product to the database: ' . $stmt->error;
        }
    
        $stmt->close();
    }
    

    public function getInsertQuery()
    {
        // Implement the insert query for the product type
        return '';
    }
    protected function saveSubProductToDatabase($conn)
    {
        // To be implemented in child classes
    }


    // Read data from database
    public function getData($conn)
    {
        $sql = "SELECT p.*, d.size_mb, b.weight_kg, f.height_cm, f.width_cm, f.length_cm 
                FROM products p
                LEFT JOIN dvd_products d ON p.sku = d.sku
                LEFT JOIN book_products b ON p.sku = b.sku
                LEFT JOIN furniture_products f ON p.sku = f.sku";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        return $data;
    }

    public function deleteProducts($conn, $dataToDelete)
    {
        // Check if the 'skusToDelete' array is present in the payload
        if (isset($dataToDelete)) {
            // Get the SKUs to delete
            $skusToDelete = $dataToDelete;

            // Prepare the SQL statement with placeholders
            $placeholders = implode(',', array_fill(0, count($skusToDelete), '?'));
            $sql = "DELETE FROM products WHERE sku IN ($placeholders)";

            // Prepare the statement
            $stmt = $conn->prepare($sql);

            // Bind the SKUs to the statement parameters
            $stmt->bind_param(str_repeat('s', count($skusToDelete)), ...$skusToDelete);

            // Execute the statement
            $result = $stmt->execute();

            if ($result) {
                // Return a response indicating success
                $response = [
                  'success' => true,
                  'message' => 'Selected products deleted successfully'
                ];
            } else {
                // Return a response indicating failure
                $response = [
                  'success' => false,
                  'message' => 'Failed to delete products'
                ];
            }
        } else {
            // Return a response indicating failure
            $response = [
              'success' => false,
              'message' => 'No products to delete',
            ];

        }
        // Send the response as JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }

}
