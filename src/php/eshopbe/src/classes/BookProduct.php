<?php

namespace eshopbe\src\classes;

use eshopbe\src\classes\Product;

class BookProduct extends Product
{
    protected $weight;

    public function __construct($sku, $name, $price, $productType, $weight)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->weight = $weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function getInsertQuery()
    {
        return "INSERT INTO book_products (sku, weight_kg) VALUES (?, ?)";
    }

    protected function bindParameters($stmt)
    {
        $sku = $this->getSku();
        $weight = $this->getWeight();
        $stmt->bind_param('ss', $sku, $weight);
    }

    public function saveSubProductToDatabase($conn)
    {
        $sql = $this->getInsertQuery();
        $stmt = $conn->prepare($sql);
        $this->bindParameters($stmt);

        if ($stmt->execute()) {
            echo 'Book product saved to the database successfully!';
        } else {
            echo 'Failed to save book product to the database: ' . $stmt->error;
        }

        $stmt->close();
    }
}
