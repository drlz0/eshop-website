<?php

namespace eshopbe\src\classes;

use eshopbe\src\classes\Product;

class DVDProduct extends Product
{
    protected $size;

    public function __construct($sku, $name, $price, $productType, $size)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->size = $size;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function getInsertQuery()
    {
        return "INSERT INTO dvd_products (sku, size_mb) VALUES (?, ?)";
    }

    protected function bindParameters($stmt)
    {
        $sku = $this->getSku();
        $size = $this->getSize();
        $stmt->bind_param('ss', $sku, $size);
    }

    public function saveSubProductToDatabase($conn)
    {
        $sql = $this->getInsertQuery();
        $stmt = $conn->prepare($sql);
        $this->bindParameters($stmt);

        if ($stmt->execute()) {
            echo 'DVD product saved to the database successfully!';
        } else {
            echo 'Failed to save DVD product to the database: ' . $stmt->error;
        }

        $stmt->close();
    }
}
